const express = require('express');

const router = express.Router();

// Return currently logged in user information
router.get('/me', function(req, res) {
  // Allow browser to cache /users/me
  res.set({
    'Cache-Control': 'private, max-age=3600',
    'Vary': 'Authorization',
  });

  res.json(req.user);
});

module.exports = router;
