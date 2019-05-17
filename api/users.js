const express = require('express');

const router = express.Router();

// Return currently logged in user information
router.get('/me', (req, res) => {
  // TODO: Increase this after moving ratings and watchlist out of /users/me
  res.setHeader('Cache-Control', 'private, max-age=10');
  res.json(req.user);
});

module.exports = router;
