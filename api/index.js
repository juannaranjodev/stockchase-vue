const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const urldecode = require('locutus/php/url/urldecode');
const unserialize = require('locutus/php/var/unserialize');

const User = require('../models').User;
const SocialRating = require('../models').SocialRating;

const router = express.Router();

// Extract session data from CodeIgniter ci_session cookie
router.use(cookieParser(null, { decode: urldecode }), async function(req, res, next) {
  if (!req.cookies.ci_session || req.cookies.ci_session.length <= 40) return next();

  var sessionCookie = req.cookies.ci_session;

  var signature = sessionCookie.slice(-40);
  var sessionData = sessionCookie.slice(0, -40);

  // Return immediately if signature don't match
  var hmac = crypto.createHmac('sha1', process.env.SESSION_KEY).update(sessionData).digest('hex');
  if (hmac !== signature) return next();

  req.session = unserialize(sessionData);
  req.user = await User.findByPk(req.session.user_id, { include: [ { all: true } ] });

  next();
});

// Deny all access for unauthenticated API call
router.use(function(req, res, next) {
  if (!req.user || !req.user.active) return res.status(401).end();

  // Check for sessions older than 30 days
  if (req.session.last_activity + (60*60*24*30) < Date.now() / 1000) return res.status(401).end();

  next();
});

// Return currently logged in user information
router.get('/users/me', function(req, res) {
  res.json(req.user);
});

// Create or update user rating for an opinion
router.post('/opinions/:id/ratings', bodyParser.json(), async function(req, res) {
  // TODO: Add opinion and rating validation
  if (!req.body.rating) return res.status(400).end();
  await SocialRating.upsert({ id: req.params.id, user_id: req.user.id, rating: req.body.rating });
});

module.exports = router;
