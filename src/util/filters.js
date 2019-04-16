import moment from 'moment';
import numeral from 'numeral';
import striptags from 'striptags';

export function host(url) {
  const h = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const parts = h.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
}

export function formatDate(date, format) {
  return moment(date, 'YYYY-MM-DD').format(format || 'LL');
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


export function formatNumber(number, format) {
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

export function stripTags(value) {
  return striptags(value);
}
