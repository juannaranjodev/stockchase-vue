const express = require('express');

const { Expert, SocialRating } = require('../models');

const router = express.Router();
// Create or update user rating for an opinion
router.get('/:page/:limit', async (req, res) => {
  const experts = await Expert.getExpertsByPage(req.params.page, req.params.limit);

  res.json(experts);
});

router.get('/search', async (req, res) => {
  if (!req.query.term) return res.status(400).json({ error: 'Missing search term' });

  res.json(await Expert.searchExperts(req.query.term, req.query.limit || 5));
});

// Create or update user rating for an expert
router.post('/:id/ratings', async (req, res) => {
  if (!req.body.rating) return res.status(400).end();

  let socialRating = await SocialRating.findOne({ where: { content_type: 'expert', content_id: req.params.id, user_id: req.user.id } });
  if (!socialRating) socialRating = SocialRating.build({ content_type: 'expert', content_id: req.params.id, user_id: req.user.id });

  socialRating.rating = req.body.rating;
  socialRating.date_rated = Math.trunc(Date.now() / 1000);

  await socialRating.save();

  res.json(socialRating);
});

module.exports = router;
