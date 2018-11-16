import db from '../../models'
import LRU from 'lru-cache'
const Opinion = db.Opinion

export function createAPI () {
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    api = process.__API__ = {
      fetchDailyOpinions: async function (date) {
        const recentDate = await Opinion.getRecentOpinionDate()
        if (date === 'recent') {
          date = recentDate
        } else if (!/^\d{4}\-\d{2}\-\d{2}/.test(date)) {
          return Promise.reject({ code: 404 })
        }

        const items = await Opinion.getOpinionsByDate(date)
        const recentItems = (recentDate === date) ? items : await Opinion.getOpinionsByDate(recentDate)

        return {
          items,
          recentItems,
          date,
          olderDate: await Opinion.getOlderOpinionDate(date),
          newerDate: await Opinion.getNewerOpinionDate(date),
        }
      }
    }
  }

  return api
}

// export function createAPI ({ config, version }) {
//   let api
//   // this piece of code may run multiple times in development mode,
//   // so we attach the instantiated API to `process` to avoid duplications
//   if (process.__API__) {
//     api = process.__API__
//   } else {
//     Firebase.initializeApp(config)
//     api = process.__API__ = Firebase.database().ref(version)
//
//     api.onServer = true
//
//     // fetched item cache
//     api.cachedItems = LRU({
//       max: 1000,
//       maxAge: 1000 * 60 * 15 // 15 min cache
//     })
//
//     // cache the latest story ids
//     api.cachedIds = {}
//     ;['top', 'new', 'show', 'ask', 'job'].forEach(type => {
//       api.child(`${type}stories`).on('value', snapshot => {
//         api.cachedIds[type] = snapshot.val()
//       })
//     })
//   }
//   return api
// }
