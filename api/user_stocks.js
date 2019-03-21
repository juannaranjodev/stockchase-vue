const express = require('express');

const UserStock = require('../models').UserStock;

const router = express.Router();

// Create or update user rating for an opinion
router.post('/', async function(req, res) {
  if (!req.body.company_id) return res.status(400).end();
  var data = { company_id: req.body.company_id, user_id: req.user.id };

  var stock = await UserStock.findOne({ where: data });
  if (stock) return res.status(409).end();

  stock = UserStock.build(data);
  await stock.save();

  res.json(stock);
});

module.exports = router;
