import db from '../../models'
import * as c from '../constants'
import _ from 'lodash'
import request from 'request'
import FeedParser from 'feedparser'
import cheerio from 'cheerio'

const Opinion = db.Opinion
const Expert = db.Expert
const BlogPost = db.BlogPost
const ExpertRating = db.ExpertRating
const Company = db.Company

export function createAPI () {
  return {
    async getTotalExperts () {
      const total = await Expert.getTotalExperts()

      return total
    },

    async getExpertsByPage (page, limit = 25) {
      const experts = await Expert.getExpertsByPage(page, limit)

      return {
        experts
      }
    },

    async fetchDailyOpinions (date) {
      const recentDate = await Opinion.getRecentOpinionDate()
      if (date === 'recent') {
        date = recentDate
      } else if (!/^\d{4}\-\d{2}\-\d{2}/.test(date)) {
        return Promise.reject({ code: 404 })
      }

      return {
        date,
        opinions: await Opinion.getOpinionsByDate(date),
        adjacentDates: await Opinion.getAdjacentOpinionDates(date),
      }
    },

    async fetchDailyMarketComments (date) {
      const recentDate = await Opinion.getRecentMarketCommentDate()
      if (date === 'recent') {
        date = recentDate
      } else if (!/^\d{4}\-\d{2}\-\d{2}/.test(date)) {
        return Promise.reject({ code: 404 })
      }

      return {
        date,
        opinions: await Opinion.getMarketCommentsByDate(date),
        adjacentDates: await Opinion.getAdjacentMarketCommentDates(date),
      }
    },

    async getOpinionUrl (id) {
      const opinion = await Opinion.findById(id)

      if (!opinion) return Promise.reject({ code: 404 })

      const date = opinion.date
      const isOpinion = opinion.company_id !== 1970

      const opinions = isOpinion ? await Opinion.getOpinionsByDate(date) : await Opinion.getMarketCommentsByDate(date)
      const opinionIndex = opinions.findIndex(o => o.id == id)
      const pageIndex = Math.floor(opinionIndex / c.PER_PAGE) + 1

      return isOpinion
        ? `/opinions/${date}/${pageIndex}#${id}`
        : `/opinions/market/${date}/${pageIndex}#${id}`
    },

    async fetchDiscoverPosts () {
      const posts = []

      await new Promise((resolve, reject) => {
        const parser = new FeedParser()

        request('https://stockchase.com/discover/feed/')
          .on('response', res => res.pipe(parser))
          .on('error', err => reject(err))

        parser.on('readable', function() {
          let item
          while (item = this.read()) {
            const $ = cheerio.load(`<div id="root">${item.description}</div>`)
            item.excerpt = _.truncate($('#root').text(), { length: 110 })
            item.image = $('img').attr('src')
            posts.push(item)
          }
        }).on('end', () => resolve()).on('error', err => reject(err))
      })

      return posts
    },

    async fetchLatestExperts (num) {
      return await Expert.getLatestExperts(num)
    },

    async fetchNewestExperts (num) {
      return await Expert.getNewestExperts(num)
    },

    async fetchNewestCompanies (num) {
      return await Company.getNewestCompanies(num)
    },

    async fetchBlogPosts (num) {
      const result = await BlogPost.getLatestBlogPosts(num)
      const posts = []

      for (var i = 0; i < result.length; i++) {
        const post = result[i].get({ plain: true })
        const media = post.media
        const companies = []
        const sources = []

        for (var j = 0; j < media.length; j++) {
          const medium = media[j]
          const company = (await Company.getCompaniesBySymbols([medium.name]))[0]

          if (company) {
            const companyData = company.get({ plain: true })
            if (medium.url) companyData.url = medium.url
            companies.push(companyData)
          } else {
            sources.push(medium)
          }
        }
        post.companies = companies
        post.sources = sources

        posts.push(post)
      }

      return posts
    },

    async fetchLatestComment () {
      const recentDate = await Opinion.getRecentMarketCommentDate()
      const comments = await Opinion.getMarketCommentsByDate(recentDate)

      return comments[0]
    },

    async fetchMarketCallGuests (num) {
      // First get num experts from latest opinions
      const [ results, metadata ] = await Expert.getLatestOpinionExperts(num)
      const experts = []

      // Then for each expert, get 7 opinions & 3 top picks
      for (var i = 0; i < results.length; i++) {
        const date = results[i].Date
        const opinions = await Opinion.getOpinionsByExpert(results[i].expert_id, date, 7)
        const topPicks = await Opinion.getTopPicksByExpert(results[i].expert_id, date, 3)
        const ratings = await ExpertRating.getRatingsByExpert(results[i].expert_id)
        const topHorizon = ratings[0]
        const expert = opinions[0].Expert
        const subject = opinions[0].Subject

        experts.push({
          expert,
          subject,
          date,
          opinions,
          topPicks,
          ratings,
          topHorizon,
        })
      }

      return experts
    },

    async fetchPremiumCompanies () {
      return await Company.getCompaniesBySymbols(['COV-X', 'PHO-T', 'GMP-T'])
    },
  }
}
