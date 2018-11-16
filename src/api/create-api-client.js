import $ from 'jquery'

export function createAPI () {
  return {
    fetchUser () {
      return $.ajax({
        url: '/api/users/me',
        xhrFields: {
          withCredentials: true
        },
      }).then((data, textStatus, jqXHR) => {
        return data
      })
    },
    rateOpinion({ id, rating }) {
      return $.ajax({
        url: `/api/opinions/${id}/ratings`,
        method: 'POST',
        data: JSON.stringify({ rating }),
        contentType: 'application/json',
        dataType: 'json',
      }).then((data, textStatus, jqXHR) => {
        console.log('success', data, textStatus)
        return data
      })
    }
  }
}
