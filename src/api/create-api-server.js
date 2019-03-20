import db from '../../models'
import * as c from '../constants'
import _ from 'lodash'

const Opinion = db.Opinion
const Expert = db.Expert
const BlogPost = db.BlogPost
const ExpertRating = db.ExpertRating
const Company = db.Company

export function createAPI () {
  return {
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

      for (var i = 0; i < 3; i++) {
        posts.push({
          id: i,
          url: '#',
          title: 'The growing role of Asia in the world.',
          excerpt: 'BAT refers to Baidu.com (BIDU-Q), Tencent Holdings Ltd (0700-HK), Alibaba Group Holding (BABA-N)',
        })
      }

      return posts
    },

    async fetchLatestExperts (num) {
      return await Expert.getLatestExperts(num)
    },

    async fetchBlogPosts () {
      const result = await BlogPost.getLatestBlogPosts()
      const posts = []

      for (var i = 0; i < result.length; i++) {
        const post = result[i].get({ plain: true })
        const media = post.media
        const companies = []
        const sources = []

        for (var j = 0; j < media.length; j++) {
          const medium = media[j]
          const company = await Company.getCompanyBySymbol(medium.name)

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
        post.date = new Date(post.date)

        posts.push(post)
      }

      return posts
    },

    async fetchLatestComment () {
      const recentDate = await Opinion.getRecentMarketCommentDate()
      const comments = await Opinion.getMarketCommentsByDate(recentDate)

      return comments[0]
    },

    async fetchMarketCallGuests () {
      // First get 3 experts from latest opinions
      const [ results, metadata ] = await Expert.getLatestOpinionExperts(3)
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
