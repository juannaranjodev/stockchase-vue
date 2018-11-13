const opinions = require('./opinions.json')

module.exports = {
  getRecentOpinions() {
    return Promise.resolve({ opinions, date: '2011-11-10', prevDate: '2011-11-9', nextDate: '2011-11-11' })
  },

  getDailyOpinions(date) {
    return Promise.resolve({ opinions, date, prevDate: '2011-11-9', nextDate: '2011-11-11' })
  }
}
