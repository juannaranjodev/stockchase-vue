const { titleize } = require('inflection');

function slugify(string) {
  return titleize(string.toString().toLowerCase().replace(/[^\s\w]+/g, ''))
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = slugify;
