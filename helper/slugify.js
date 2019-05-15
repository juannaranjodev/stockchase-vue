function slugify(string) {
  return string.toString()
    .replace(/[^\s\w]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = slugify;
