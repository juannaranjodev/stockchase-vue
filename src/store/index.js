import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      opinions: {},
      date: null,
      adjacentDates: [],
      olderDate: null,
      newerDate: null,
      user: {},
      topPicks: [],
      trendingStocks: [],
      discoverPosts: [],
      latestExperts: [],
      newestExperts: [],
      newestCompanies: [],
      blogPosts: [],
      latestComment: {},
      marketCallGuests: [],
      premiumCompanies: [],
      topExperts: [
        {
          id: 1,
          name: 'Brian Acker, CA',
          index: 0,
          period: '1 Month',
          rate: 4,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 1,
          name: 'Brian Acker, CA',
          index: 1,
          period: '6 Months',
          rate: 5,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 1,
          name: 'Brian Acker, CA',
          index: 2,
          period: '12 Months',
          rate: 3,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 7,
          name: 'Brendan Caldwell',
          index: 0,
          period: '1 Month',
          rate: 4,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 7,
          name: 'Brendan Caldwell',
          index: 1,
          period: '6 Months',
          rate: 3.5,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 7,
          name: 'Brendan Caldwell',
          index: 2,
          period: '2 years',
          rate: 4,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 11,
          name: 'David Dri',
          index: 0,
          period: '1 Month',
          rate: 2,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 11,
          name: 'David Dri',
          index: 1,
          period: '5 years',
          rate: 5,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        }
      ],
      worstExperts: [
        {
          id: 12,
          name: 'Brian Acker, CA',
          index: 0,
          period: '1 Month',
          rate: 4,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 12,
          name: 'Brian Acker, CA',
          index: 1,
          period: '6 Months',
          rate: 5,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 12,
          name: 'Brian Acker, CA',
          index: 2,
          period: '12 Months',
          rate: 3,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 118,
          name: 'David Dri',
          index: 0,
          period: '1 Month',
          rate: 2,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 118,
          name: 'David Dri',
          index: 1,
          period: '5 years',
          rate: 5,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 71,
          name: 'Brendan Caldwell',
          index: 0,
          period: '1 Month',
          rate: 4,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 71,
          name: 'Brendan Caldwell',
          index: 1,
          period: '6 Months',
          rate: 3.5,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        },
        {
          id: 71,
          name: 'Brendan Caldwell',
          index: 2,
          period: '2 years',
          rate: 4,
          bigLose: 8,
          lose: 56,
          noChange: 71,
          win: 62,
          bigWin: 0
        }
      ],
    },
    actions,
    mutations,
    getters
  })
}
