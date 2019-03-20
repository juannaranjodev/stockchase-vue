const express = require('express');

const Expert = require('../models').Expert;

const router = express.Router();
// Create or update user rating for an opinion
router.get('/:page/:limit', async function(req, res) {

  var experts = await Expert.getExpertsByPage(req.params.page, req.params.limit);

  res.json(experts);
});

module.exports = router;
