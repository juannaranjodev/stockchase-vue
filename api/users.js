const express = require('express');

const router = express.Router();

// Return currently logged in user information
router.get('/me', function(req, res) {
  res.json(req.user);
});

module.exports = router;
