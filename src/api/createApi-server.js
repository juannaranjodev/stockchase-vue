/* eslint-disable no-console */
import _ from 'lodash';
import request from 'request';
import Parser from 'rss-parser';
import * as c from '../constants';
import db from '../../models';

const { Opinion } = db;
const { Expert } = db;
const { BlogPost } = db;
const { ExpertRating } = db;
const { Company } = db;

export default function createAPI() {
  return {
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
      const opinion = await Opinion.findByPk(id);

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
      const parser = new Parser();

      const feed = await parser.parseURL('http://stockchase.com/discover/feed/');

      return _(feed.items).slice(0, 3).map(item => ({
        title: item.title,
        excerpt: _.truncate(item.contentSnippet.replace(/\[….*/, ''), { length: 110 }),
        image: item.content.match(/img[^>]+ src="([^"]+)/)[1],
        link: item.link,
      })).value();
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
        const topPicks = await Opinion.getExpertTopPicksByDate(results[i].expert_id, date, 3);
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
      const symbols = ['MRU-T', 'ENB-T', 'FTS-T', 'BNS-T'];
      const companies = await Company.getCompaniesBySymbols(symbols);

      return _.sortBy(companies, company => symbols.indexOf(company.symbol));
    },

    async fetchDisqusComments() {
      return new Promise((resolve, reject) => {
        request({
          url: `https://disqus.com/api/3.0/forums/listPosts.json?limit=51&forum=${process.env.DISQUS_SHORTNAME}&api_key=${process.env.DISQUS_PUBLIC_KEY}`,
          json: true,
        }, (err, response, body) => {
          if (err) return reject(err);

          // Sometimes due to rate limit disqus would return a string here instead of an array
          return resolve(_.isArray(body.response) ? body.response : []);
        });
      });
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

    async fetchCompanyOpinionsByPage(id, page, perPage) {
      return Opinion.getCompanyOpinionsByPage(id, page, perPage);
    },

    async fetchExpertById(id) {
      return Expert.getExpertById(id);
    },

    async fetchExpertOpinionsByPage(id, page, perPage) {
      return Opinion.getExpertOpinionsByPage(id, page, perPage);
    },

    async fetchExpertFirstOpinionDate(id) {
      return Opinion.getExpertFirstOpinionDate(id);
    },

    async fetchExpertTopPicks(id, limit) {
      return Opinion.getExpertTopPicks(id, limit);
    },

    async getCompaniesWithOpinions(page = 1, limit = 25) {
      return Company.getCompaniesByPage(page, limit);
    },

    async fetchTopPicksByPage(page, perPage) {
      return Opinion.getTopPicksByPage(page, perPage);
    },

    async fetchCompaniesByPage(page, perPage, filters) {
      return Company.getCompaniesByPage(page, perPage, filters);
    },

    async fetchExpertsByPage(page, perPage, filters) {
      return Expert.getExpertsByPage(page, perPage, filters);
    },
  };
}
