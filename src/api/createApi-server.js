import _ from 'lodash';
import moment from 'moment';
import request from 'request';
import FeedParser from 'feedparser';
import cheerio from 'cheerio';
import * as c from '../constants';
import db from '../../models';

const { Opinion } = db;
const { Expert } = db;
const { BlogPost } = db;
const { ExpertRating } = db;
const { Company } = db;

export default function createAPI() {
  return {
    getExpertsTotalByCharacter(character, type = 'L') {
      return Expert.getExpertsTotalByCharacter(character, type === 'L' ? 'LastName' : 'FirstName');
    },

    async getExpertsByFirstCharacter(character, type = 'L', page = 1, limit = 15) {
      const experts = await Expert.getExpertsByCharacter(character, type === 'L' ? 'LastName' : 'FirstName', page, limit);

      return {
        experts,
      };
    },

    async getExpertsByName(term, page = 1, limit = 15) {
      const experts = await Expert.getExpertsByName(term, page, limit);

      return {
        experts,
      };
    },

    getTotalExperts(term = null) {
      return Expert.getTotalExperts(term);
    },

    async getExpertsByPage(page = 1, limit = 15) {
      const experts = await Expert.getExpertsByPage(page, limit);

      return {
        experts,
      };
    },

    async fetchDailyOpinions(dateParam) {
      const recentDate = await Opinion.getRecentOpinionDate();
      let date = dateParam;
      if (date === 'recent') {
        date = recentDate;
      } else if (!/^\d{4}-\d{2}-\d{2}/.test(date)) {
        return Promise.reject({ code: 404 });
      }

      return {
        date,
        opinions: await Opinion.getOpinionsByDate(date),
        adjacentDates: await Opinion.getAdjacentOpinionDates(date),
      };
    },

    async fetchDailyMarketComments(dateParam) {
      const recentDate = await Opinion.getRecentMarketCommentDate();
      let date = dateParam;
      if (date === 'recent') {
        date = recentDate;
      } else if (!/^\d{4}-\d{2}-\d{2}/.test(date)) {
        return Promise.reject({ code: 404 });
      }

      return {
        date,
        opinions: await Opinion.getMarketCommentsByDate(date),
        adjacentDates: await Opinion.getAdjacentMarketCommentDates(date),
      };
    },

    async getOpinionUrl(id) {
      const opinion = await Opinion.findById(id);

      if (!opinion) return Promise.reject({ code: 404 });

      const { date } = opinion;
      const isOpinion = opinion.company_id !== 1970;

      const opinions = isOpinion
        ? await Opinion.getOpinionsByDate(date)
        : await Opinion.getMarketCommentsByDate(date);
      const opinionIndex = opinions.findIndex(o => o.id === Number(id));
      console.assert(opinionIndex > -1);
      const pageIndex = Math.floor(opinionIndex / c.PER_PAGE) + 1;
      console.assert(pageIndex > 0);

      return isOpinion
        ? `/opinions/${date}/${pageIndex}#${id}`
        : `/opinions/market/${date}/${pageIndex}#${id}`;
    },

    async fetchDiscoverPosts() {
      const posts = [];

      await new Promise((resolve, reject) => {
        const parser = new FeedParser();

        request('https://stockchase.com/discover/feed/')
          .on('response', res => res.pipe(parser))
          .on('error', err => reject(err));

        parser.on('readable', function parseItem() {
          let item;
          /* eslint-disable-next-line no-cond-assign */
          while (item = this.read()) {
            const $ = cheerio.load(`<div id="root">${item.description}</div>`);
            item.excerpt = _.truncate($('#root').text(), { length: 110 });
            item.image = $('img').attr('src');
            posts.push(item);
          }
        }).on('end', () => resolve()).on('error', err => reject(err));
      });

      return posts;
    },

    async fetchLatestExperts(num) {
      return Expert.getLatestExperts(num);
    },

    async fetchNewestExperts(num) {
      return Expert.getNewestExperts(num);
    },

    async fetchTopOrWorstExperts(isTop) {
      return ExpertRating.getTopOrWorstExperts(isTop);
    },

    async fetchNewestCompanies(num) {
      return Company.getNewestCompanies(num);
    },

    async fetchBlogPosts(num) {
      const result = await BlogPost.getLatestBlogPosts(num);
      const posts = [];

      // TODO refactor this to have no await in loop AND no ++
      /* eslint-disable-next-line no-plusplus */
      for (let i = 0; i < result.length; i++) {
        const post = result[i].get({ plain: true });
        const { media } = post;
        const companies = [];
        const sources = [];

        /* eslint-disable-next-line no-plusplus */
        for (let j = 0; j < media.length; j++) {
          const medium = media[j];
          /* eslint-disable-next-line no-await-in-loop */
          const company = (await Company.getCompaniesBySymbols([medium.name]))[0];
          if (company) {
            const companyData = company.get({ plain: true });
            if (medium.url) companyData.url = medium.url;
            companies.push(companyData);
          } else {
            sources.push(medium);
          }
        }
        post.companies = companies;
        post.sources = sources;

        posts.push(post);
      }

      return posts;
    },

    async fetchLatestComment() {
      const recentDate = await Opinion.getRecentMarketCommentDate();
      const comments = await Opinion.getMarketCommentsByDate(recentDate);

      return comments[0];
    },

    async fetchMarketCallGuests(num) {
      // First get num experts from latest opinions
      const [results] = await Expert.getLatestOpinionExperts(num);
      const experts = [];

      // Then for each expert, get 7 opinions & 3 top picks
      // TODO refactor this to have no await in loop AND no ++
      /* eslint-disable-next-line no-plusplus */
      for (let i = 0; i < results.length; i++) {
        const date = results[i].Date;
        /* eslint-disable no-await-in-loop */
        const opinions = await Opinion.getOpinionsByExpert(results[i].expert_id, date, 7);
        const topPicks = await Opinion.getTopPicksByExpert(results[i].expert_id, date, 3);
        const ratings = await ExpertRating.getRatingsByExpert(results[i].expert_id);
        /* eslint-enable no-await-in-loop */
        const topHorizon = ratings[0];
        const expert = opinions[0].Expert;
        const subject = opinions[0].Subject;

        experts.push({
          expert,
          subject,
          date,
          opinions,
          topPicks,
          ratings,
          topHorizon,
        });
      }

      return experts;
    },

    async fetchPremiumCompanies() {
      const symbols = ['V-N', 'RY-T', 'TD-T'];
      const companies = await Company.getCompaniesBySymbols(symbols);

      return _.sortBy(companies, company => symbols.indexOf(company.symbol));
    },

    async fetchDisqusCommentsCount() {
      const comments = await new Promise((resolve, reject) => {
        request({
          url: `https://disqus.com/api/3.0/forums/listPosts.json?limit=51&forum=${process.env.DISQUS_SHORTNAME}&api_key=${process.env.DISQUS_PUBLIC_KEY}`,
          json: true,
        }, (err, response, body) => {
          if (err) return reject(err);

          return resolve(body.response);
        });
      });

      const now = moment();
      return _.filter(comments, comment => moment(comment.createdAt).diff(now, 'days') <= 7).length;
    },

    async fetchCompanyById(id) {
      const company = await Company.getCompanyById(id);

      const [data, quote] = await Promise.all([
        new Promise((resolve) => {
          request({
            url: `http://data.wealthica.com/api/securities/${company.symbol}/company`,
            json: true,
          }, (err, response, body) => {
            if (err) return resolve({}); // do not throw

            return resolve(body || {});
          });
        }),
        new Promise((resolve) => {
          request({
            url: `http://data.wealthica.com/api/securities/${company.symbol}`,
            json: true,
          }, (err, response, body) => {
            if (err) return resolve({}); // do not throw

            return resolve(body || {});
          });
        }),
      ]);

      return {
        ...company,
        quote,
        data,
      };
    },

    async countOpinionsByCompany(id) {
      return Opinion.countOpinionsByCompany(id);
    },

    async fetchOpinionsByCompany(id, page, perPage) {
      return Opinion.getOpinionsByCompany(id, page, perPage);
    },
  };
}
