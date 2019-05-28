/* eslint-disable camelcase */
const _ = require('lodash');

module.exports = function (ratings) {
  const result = {};

  result.rating = _.meanBy(ratings, ({
    big_win, win, big_lose, lose,
  }) => {
    const score = _.sum([big_win, win]) - _.sum([big_lose, lose]);

    if (score > 10) return 5;
    if (score < 11 && score > 0) return 4;
    if (score > -11 && score < 0) return 2;
    if (score < -11) return 1;
    if (_.some([big_win, win, big_lose, lose], Number)) return 3;
    return null;
  });
  result.ratings_count = ratings.length;

  result.totalWins = _.sumBy(ratings, ({ big_win, win }) => big_win + win);
  result.totalLoses = _.sumBy(ratings, ({ big_lose, lose }) => big_lose + lose);

  return result;
}
