import moment from 'moment'

export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function formatDate (date, format) {
  return moment(date, 'YYYY-MM-DD').format(format || 'LL')
}

export function formatSignalName (signal) {
  switch (signal) {
    case 'BUY on WEAKNESS':
      return 'BUY WEAKNESS';
    case 'SELL ON STRENGTH':
      return 'SELL STRENGTH';
    default:
      return signal;
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
