// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'
import moment from 'moment'

const logRequests = !!process.env.DEBUG_API

const api = createAPI()

export async function fetchDailyOpinions (date) {
  if (date === 'recent') {
    date = await api.getRecentOpinionDate()
  } else if (!/^\d{4}\-\d{2}\-\d{2}/.test(date)) {
    return Promise.reject({ code: 404 })
  }

  return {
    items: await api.getOpinionsByDate(date),
    date: date,
    olderDate: await api.getOlderOpinionDate(date),
    newerDate: await api.getNewerOpinionDate(date),
  }
}

// const api = createAPI({
//   version: '/v0',
//   config: {
//     databaseURL: 'https://hacker-news.firebaseio.com'
//   }
// })
//
// // warm the front page cache every 15 min
// // make sure to do this only once across all requests
// if (api.onServer) {
//   warmCache()
// }
//
// function warmCache () {
//   fetchItems((api.cachedIds.top || []).slice(0, 30))
//   setTimeout(warmCache, 1000 * 60 * 15)
// }
//
// function fetch (child) {
//   logRequests && console.log(`fetching ${child}...`)
//   const cache = api.cachedItems
//   if (cache && cache.has(child)) {
//     logRequests && console.log(`cache hit for ${child}.`)
//     return Promise.resolve(cache.get(child))
//   } else {
//     return new Promise((resolve, reject) => {
//       api.child(child).once('value', snapshot => {
//         const val = snapshot.val()
//         // mark the timestamp when this item is cached
//         if (val) val.__lastUpdated = Date.now()
//         cache && cache.set(child, val)
//         logRequests && console.log(`fetched ${child}.`)
//         resolve(val)
//       }, reject)
//     })
//   }
// }
// export function fetchIdsByType (type) {
//   return api.cachedIds && api.cachedIds[type]
//     ? Promise.resolve(api.cachedIds[type])
//     : fetch(`${type}stories`)
// }
//
// export function fetchItem (id) {
//   return fetch(`item/${id}`)
// }
//
// export function fetchItems (ids) {
//   return Promise.all(ids.map(id => fetchItem(id)))
// }
//
// export function fetchUser (id) {
//   return fetch(`user/${id}`)
// }
//
// export function watchList (type, cb) {
//   let first = true
//   const ref = api.child(`${type}stories`)
//   const handler = snapshot => {
//     if (first) {
//       first = false
//     } else {
//       cb(snapshot.val())
//     }
//   }
//   ref.on('value', handler)
//   return () => {
//     ref.off('value', handler)
//   }
// }
