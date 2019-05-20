import $ from 'jquery';
import Cookies from 'js-cookie';

const getSessionCookie = () => {
  const cookies = Cookies.withConverter(value => value);
  return cookies.get('ci_session');
};

// Pass ci_session cookie via Authorization header for caching
const beforeSend = (xhr) => {
  const session = getSessionCookie();
  if (session) xhr.setRequestHeader('Authorization', `Bearer ${session}`);
};

// Wrap ajax request with session cookie and es6-promise for consistent promise APIs
const ajax = options => new Promise(((resolve, reject) => {
  $.ajax({
    ...options,
    beforeSend,
  }).then(resolve).catch(reject);
}));

// Ajax wrapper for protected routes where we want to redirect user on login page on 401 error
const protectedAjax = options => ajax(options).catch((err) => {
  if (err.status === 401) {
    // ci_session seems useless so remove it
    Cookies.remove('ci_session');

    // NOTE we want to stop the error propagation here, so we return the redirection directly for
    // the browser to finish it before moving to the next line. Otherwise the error would travel up
    // to other `catch`s and causes unexpected behavior.
    /* eslint-disable-next-line no-return-assign */
    return window.location = '/member/login';
  }

  throw err;
});

export default function createAPI() {
  return {
    // Don't go through the wrapped ajax request because we want to silently
    // ignore this fetchUser call
    fetchUser() {
      // Check if session cookie exists. If not, skip the user fetch altogether
      const session = getSessionCookie();
      if (!session) return Promise.resolve({});

      return ajax({ url: '/api/v2/users/me' });
    },
    rateOpinion({ id, rating }) {
      return protectedAjax({
        url: `/api/v2/opinions/${id}/ratings`,
        method: 'POST',
        data: JSON.stringify({ rating }),
        contentType: 'application/json',
        dataType: 'json',
      });
    },
    rateCompany({ id, rating }) {
      return protectedAjax({
        url: `/api/v2/companies/${id}/ratings`,
        method: 'POST',
        data: JSON.stringify({ rating }),
        contentType: 'application/json',
        dataType: 'json',
      });
    },
    rateExpert({ id, rating }) {
      return protectedAjax({
        url: `/api/v2/experts/${id}/ratings`,
        method: 'POST',
        data: JSON.stringify({ rating }),
        contentType: 'application/json',
        dataType: 'json',
      });
    },
    createUserStock({ companyId }) {
      return protectedAjax({
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
        data: { term, limit },
        contentType: 'application/json',
        dataType: 'json',
      });
    },
    searchCompanies({ term, limit = 5 }) {
      return ajax({
        url: '/api/v2/companies/search',
        data: { term, limit },
        contentType: 'application/json',
        dataType: 'json',
      });
    },
  };
}
