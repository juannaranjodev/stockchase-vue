const express = require('express');

const SocialRating = require('../models').SocialRating;

const router = express.Router();

// Create or update user rating for an opinion
router.post('/:id/ratings', async function(req, res) {
  // TODO: Add opinion and rating validation
  if (!req.body.rating) return res.status(400).end();
  await SocialRating.upsert({ id: req.params.id, user_id: req.user.id, rating: req.body.rating });
});

module.exports = router;
