/* eslint-disable camelcase */
const strip_tags = require('locutus/php/strings/strip_tags');
const strtolower = require('locutus/php/strings/strtolower');
const strtoupper = require('locutus/php/strings/strtoupper');
const trim = require('locutus/php/strings/trim');
const ucwords = require('locutus/php/strings/ucwords');

function urlTitle(source, separator = '-', lowercase = false) {
  // port of url_title helper from codeigniter
  if (separator === 'dash') separator = '-';
  else if (separator === 'underscore') separator = '_';

  const trans = [
    [/\&\.\+\?\;/i, ''],
    [/[^a-z0-9 _-]/i, ''],
    [/\s+/i, separator],
    [/(\-)+/i, separator],
  ];

  let result = strip_tags(source);

  for (let i = 0; i < trans.length; i++) {
    result = result.replace(trans[i][0], trans[i][1]);
  }

  if (lowercase) result = strtolower(result);

  return trim(result, separator);
}

module.exports = {
  expert: function(name) {
    // Converted from original slugify code from v1 expert controller (php/codeigniter):
    // $url_name = ucwords(url_title($expert['name']));
    return ucwords(urlTitle(name));
  },
  company: function(symbol) {
    // Converted from original slugify code from v1 company controller (php/codeigniter):
    // $url_name = strtoupper(url_title(str_replace('(Dead)', '', $company['symbol'])));
    return strtoupper(urlTitle(symbol.replace('(Dead)', '')));
  },
};
