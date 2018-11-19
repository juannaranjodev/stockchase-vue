import db from '../../models'
const Opinion = db.Opinion

export function createAPI () {
  return {
    fetchDailyOpinions: async function (date) {
      const recentDate = await Opinion.getRecentOpinionDate()
      if (date === 'recent') {
        date = recentDate
      } else if (!/^\d{4}\-\d{2}\-\d{2}/.test(date)) {
        return Promise.reject({ code: 404 })
      }

      const opinions = await Opinion.getOpinionsByDate(date)
      const recentOpinions = (recentDate === date) ? opinions : await Opinion.getOpinionsByDate(recentDate)

      return {
        opinions,
        recentOpinions,
        date,
        olderDate: await Opinion.getOlderOpinionDate(date),
        newerDate: await Opinion.getNewerOpinionDate(date),
      }
    },

    fetchDailyMarketComments: async function (date) {
      const recentDate = await Opinion.getRecentMarketCommentDate()
      if (!date || date === 'recent') {
        date = recentDate
      } else if (!/^\d{4}\-\d{2}\-\d{2}/.test(date)) {
        return Promise.reject({ code: 404 })
      }

      const opinions = await Opinion.getMarketCommentsByDate(date)
      const recentOpinions = (recentDate === date) ? opinions : await Opinion.getMarketCommentsByDate(recentDate)

      return {
        opinions,
        recentOpinions,
        date,
        olderDate: await Opinion.getOlderMarketCommentDate(date),
        newerDate: await Opinion.getNewerMarketCommentDate(date),
      }
    }
  }
}
