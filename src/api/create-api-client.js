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
    }
  }
}
