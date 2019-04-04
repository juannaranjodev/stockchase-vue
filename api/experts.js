const express = require('express');

const Expert = require('../models').Expert;

const router = express.Router();
// Create or update user rating for an opinion
router.get('/:page/:limit', async function(req, res) {

  var experts = await Expert.getExpertsByPage(req.params.page, req.params.limit);

  res.json(experts);
});

router.post('/search', async function(req, res) {
  const limit = req.body.limit || 5

  if(!req.body.term) return res.status(500).json({ error: 'Missing required field!' });

  var experts = await Expert.searchExperts(req.body.term, limit);

  res.json(experts);
});

module.exports = router;
