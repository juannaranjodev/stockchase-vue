import moment from 'moment';
import numeral from 'numeral';
import cheerio from 'cheerio';

export function host(url) {
  const h = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const parts = h.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
}

export function formatDate(date, format = 'LL') {
  if (moment.isMoment(date)) return date.format(format);

  return moment(date, 'YYYY-MM-DD').format(format);
}

export function formatSignalName(signal) {
  switch (signal) {
    case 'BUY on WEAKNESS':
      return 'BUY WEAKNESS';
    case 'SELL ON STRENGTH':
      return 'SELL STRENGTH';
    default:
      return signal;
  }
}

export function formatNumber(number, format = '0,0') {
  return numeral(number).format(format);
}

export function formatPercentage(percentage, format = '0,0.00%') {
  return formatNumber(percentage, format);
}

export function percentageAgainst(numerator, denominator = 1.0) {
  if (denominator < 1e-6) {
    return '';
  }

  return numerator / denominator;
}

export function round(value) {
  return formatNumber(value, '0,0[.][00]');
}

export function stripTags(value) {
  const $ = cheerio.load(value);

  return $.text();
}

export function topPickDate(date) {
  return moment(date).format('MMMM Do, YYYY');
}

export function displayPeriodName(period) {
  switch (period) {
    case 'one_month':
      return '1 Month';
    case 'six_months':
      return '6 Months';
    case 'twelve_months':
      return '12 Months';
    case 'two_years':
      return '2 Years';
    case 'five_years':
      return '5 Years';
    default:
      return period;
  }
}

export function modelPeriodName(period) {
  switch (period) {
    case '1 Month':
      return 'one_month';
    case '6 Months':
      return 'six_months';
    case '12 Months':
      return 'twelve_months';
    case '2 Years':
      return 'two_years';
    case '5 Years':
      return 'five_years';
    default:
      return period;
  }
}

export function displayPerformanceName(performance) {
  switch (performance) {
    case 'big_win':
      return 'BIG WIN';
    case 'win':
      return 'WIN';
    case 'no_change':
      return 'NEUTRAL';
    case 'lose':
      return 'LOSE';
    case 'big_lose':
      return 'BIG LOSE';
    default:
      return performance;
  }
}
