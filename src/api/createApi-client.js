import $ from 'jquery'
import Cookies from 'js-cookie'

// Pass ci_session cookie via Authorization header for caching
const beforeSend = (xhr) => {
  const cookies = Cookies.withConverter((value, name) => value)
  const session = cookies.get('ci_session')
  if (session) xhr.setRequestHeader('Authorization', `Bearer ${session}`)
}

// Wrap ajax request with session cookie and global error handling
const ajax = (options) => {
  return $.ajax({
    ...options,
    beforeSend
  }).catch(err => {
    if (err.status === 401) {
      return window.location = '/member/login'
    }

    throw err
  })
}

export function createAPI () {
  return {
    // Don't go through the wrapped ajax request because we want to silently
    // ignore this fetchUser call
    fetchUser () {
      return $.ajax({
        url: '/api/v2/users/me',
        beforeSend,
      }).then((data, textStatus, jqXHR) => data)
    },
    rateOpinion({ id, rating }) {
      return ajax({
        url: `/api/v2/opinions/${id}/ratings`,
        method: 'POST',
        data: JSON.stringify({ rating }),
        contentType: 'application/json',
        dataType: 'json',
      }).then((data, textStatus, jqXHR) => data)
    },
    createUserStock({ company_id }) {
      return ajax({
        url: `/api/v2/user_stocks`,
        method: 'POST',
        data: JSON.stringify({ company_id }),
        contentType: 'application/json',
        dataType: 'json',
      }).then((data, textStatus, jqXHR) => data)
    },
    searchExperts({ term, limit = 5 }){
      return ajax({
        url: `/api/v2/experts/search`,
        method: 'POST',
        data: JSON.stringify({ term, limit }),
        contentType: 'application/json',
        dataType: 'json',
      }).catch(error => console.log(error));
    }
  }
}
