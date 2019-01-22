import $ from 'jquery'
import Cookies from 'js-cookie'

// Pass ci_session cookie via Authorization header for caching
const beforeSend = (xhr) => {
  const cookies = Cookies.withConverter((value, name) => value)
  const session = cookies.get('ci_session')
  if (session) xhr.setRequestHeader('Authorization', `Bearer ${session}`)
}

export function createAPI () {
  return {
    fetchUser () {
      return $.ajax({
        url: '/api/v2/users/me',
        beforeSend,
      }).then((data, textStatus, jqXHR) => {
        return data
      })
    },
    rateOpinion({ id, rating }) {
      return $.ajax({
        url: `/api/v2/opinions/${id}/ratings`,
        method: 'POST',
        data: JSON.stringify({ rating }),
        contentType: 'application/json',
        dataType: 'json',
        beforeSend,
      }).then((data, textStatus, jqXHR) => {
        return data
      })
    }
  }
}
