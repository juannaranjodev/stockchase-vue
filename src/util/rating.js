export function getPossibleRatings() {
  return [1, -1, 2, 3, 4];
}

/* eslint-disable global-require */
export function getRatingImage(rating) {
  switch (rating) {
    case 1:
      return require('../assets/images/smileys/happy.png');
    case -1:
      return require('../assets/images/smileys/bad.png');
    case 2:
      return require('../assets/images/smileys/neutral.png');
    case 3:
      return require('../assets/images/smileys/angry.png');
    case 4:
      return require('../assets/images/smileys/surprise.png');
    default:
      return require('../assets/images/smileys/smiley-glasses.png');
  }
}
/* eslint-enable global-require */
