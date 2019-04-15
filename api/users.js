const express = require('express');

const router = express.Router();

// Return currently logged in user information
router.get('/me', (req, res) => {
  res.json(req.user);
});

module.exports = router;
