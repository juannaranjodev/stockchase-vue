const allOpinions = require('./opinions.json')
import moment from 'moment'
import _ from 'lodash'

const sortedOpinions = _.sortBy(allOpinions, (o) => {
  return -moment.utc(o.date, 'LL')
})

const getRecentOpinions = (date) => {
  const latestOpinion = sortedOpinions[0];
  return getDailyOpinions(moment.utc(latestOpinion.date, 'LL').format('YYYY-MM-DD'))
}

const getDailyOpinions = (date) => {
  const items = _.filter(sortedOpinions, (o) => {
    return moment.utc(o.date, 'LL').format('YYYY-MM-DD') === date
  })

  const numOpinions = items.length
  const firstOpinionIndex = numOpinions && _.findIndex(sortedOpinions, (o) => {
    return o.id === items[0].id
  })
  const lastOpinionIndex = numOpinions && _.findIndex(sortedOpinions, (o) => {
    return o.id === items[numOpinions - 1].id
  })
  const firstNewerOpinion = sortedOpinions[firstOpinionIndex - 1]
  const firstOlderOpinion = sortedOpinions[lastOpinionIndex + 1]

  return Promise.resolve({
    items,
    date: numOpinions && moment.utc(items[0].date, 'LL').format('YYYY-MM-DD'),
    olderDate: firstOlderOpinion && moment.utc(firstOlderOpinion.date, 'LL').format('YYYY-MM-DD'),
    newerDate: firstNewerOpinion && moment.utc(firstNewerOpinion.date, 'LL').format('YYYY-MM-DD'),
  })
}

export default {
  getRecentOpinions,
  getDailyOpinions
}
