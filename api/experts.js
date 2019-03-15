const express = require('express');

const Expert = require('../models').Expert;

const router = express.Router();
// Create or update user rating for an opinion
router.get('/', async function(req, res) {

  var experts = await Expert.getExperts();

  res.json(experts);
});

module.exports = router;
