import $ from 'jquery';
import Cookies from 'js-cookie';

// Pass ci_session cookie via Authorization header for caching
const beforeSend = (xhr) => {
  const cookies = Cookies.withConverter(value => value);
  const session = cookies.get('ci_session');
  if (session) xhr.setRequestHeader('Authorization', `Bearer ${session}`);
};

// Wrap ajax request with session cookie and global error handling
const ajax = options => $.ajax({
  ...options,
  beforeSend,
}).catch((err) => {
  if (err.status === 401) {
    window.location = '/member/login';
    return;
  }

  throw err;
});

export default function createAPI() {
  return {
    // Don't go through the wrapped ajax request because we want to silently
    // ignore this fetchUser call
    fetchUser() {
      return $.ajax({
        url: '/api/v2/users/me',
        beforeSend,
      });
    },
    rateOpinion({ id, rating }) {
      return ajax({
        url: `/api/v2/opinions/${id}/ratings`,
        method: 'POST',
        data: JSON.stringify({ rating }),
        contentType: 'application/json',
        dataType: 'json',
      });
    },
    rateCompany({ id, rating }) {
      return ajax({
        url: `/api/v2/companies/${id}/ratings`,
        method: 'POST',
        data: JSON.stringify({ rating }),
        contentType: 'application/json',
        dataType: 'json',
      });
    },
    createUserStock({ companyId }) {
      return ajax({
        url: '/api/v2/user_stocks',
        method: 'POST',
        data: JSON.stringify({ company_id: companyId }),
        contentType: 'application/json',
        dataType: 'json',
      });
    },
    searchExperts({ term, limit = 5 }) {
      return ajax({
        url: '/api/v2/experts/search',
        method: 'POST',
        data: JSON.stringify({ term, limit }),
        contentType: 'application/json',
        dataType: 'json',
      });
    },
  };
}
