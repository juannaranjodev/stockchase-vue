const express = require('express');

const { Company, Opinion, SocialRating } = require('../models');

const router = express.Router();

// Check company is valid
router.param('id', async (req, res, next, id) => {
  const company = /^\d+$/.test(id)
    ? await Company.findByPk(id)
    : await Company.getCompanyBySymbol(id);

  if (!company) return res.status(404).end();

  req.company = company;

  next();
});

// Create or update user rating for a company
router.post('/:id/ratings', async (req, res) => {
  if (!req.body.rating) return res.status(400).end();

  let socialRating = await SocialRating.findOne({ where: { content_type: 'company', content_id: req.params.id, user_id: req.user.id } });
  if (!socialRating) socialRating = SocialRating.build({ content_type: 'company', content_id: req.params.id, user_id: req.user.id });

  socialRating.rating = req.body.rating;
  socialRating.date_rated = Math.trunc(Date.now() / 1000);

  await socialRating.save();

  res.json(socialRating);
});

// Create or update user rating for a company
router.get('/:id/opinions', async (req, res) => {
  const opinions = await Opinion.getOpinionsByCompany(req.company.id);

  res.json(opinions);
});

module.exports = router;
