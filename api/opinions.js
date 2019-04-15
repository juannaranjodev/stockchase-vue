const express = require('express');

const Opinion = require('../models').Opinion;
const SocialRating = require('../models').SocialRating;

const router = express.Router();

// Check opinion is valid
router.param('id', async function(req, res, next, id) {
  var opinion = await Opinion.findByPk(id);
  if (!opinion) return res.status(404).end();
  next();
});

// Create or update user rating for an opinion
router.post('/:id/ratings', async function(req, res) {
  if (!req.body.rating) return res.status(400).end();

  var socialRating = await SocialRating.findOne({ where: { content_type: 'opinion', content_id: req.params.id, user_id: req.user.id }});
  if (!socialRating) socialRating = SocialRating.build({ content_type: 'opinion', content_id: req.params.id, user_id: req.user.id });

  socialRating.rating = req.body.rating;
  socialRating.date_rated = Math.trunc(Date.now() / 1000);

  await socialRating.save();

  res.json(socialRating);
});

module.exports = router;
