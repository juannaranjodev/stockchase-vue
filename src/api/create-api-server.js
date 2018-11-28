import db from '../../models'
const Opinion = db.Opinion

export function createAPI () {
  return {
    async fetchDailyOpinions (date) {
      const recentDate = await Opinion.getRecentOpinionDate()
      if (date === 'recent') {
        date = recentDate
      } else if (!/^\d{4}\-\d{2}\-\d{2}/.test(date)) {
        return Promise.reject({ code: 404 })
      }

      const opinions = await Opinion.getOpinionsByDate(date)

      return {
        opinions,
        date,
        olderDate: await Opinion.getOlderOpinionDate(date),
        newerDate: await Opinion.getNewerOpinionDate(date),
      }
    },

    async fetchDailyMarketComments (date) {
      const recentDate = await Opinion.getRecentMarketCommentDate()
      if (date === 'recent') {
        date = recentDate
      } else if (!/^\d{4}\-\d{2}\-\d{2}/.test(date)) {
        return Promise.reject({ code: 404 })
      }

      const opinions = await Opinion.getMarketCommentsByDate(date)

      return {
        opinions,
        date,
        olderDate: await Opinion.getOlderMarketCommentDate(date),
        newerDate: await Opinion.getNewerMarketCommentDate(date),
      }
    }
  }
}
