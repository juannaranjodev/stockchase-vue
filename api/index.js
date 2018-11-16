const express = require('express');
const cookieParser = require('cookie-parser')
const crypto = require('crypto');
const urldecode = require('locutus/php/url/urldecode');
const unserialize = require('locutus/php/var/unserialize');

const User = require('../models').User;

const router = express.Router();

// Check user session
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
  req.user = await User.findByPk(req.session.user_id);

  next();
});

// Deny all access for unauthenticated API call
router.use(function(req, res, next) {
  if (!req.user || !req.user.active) return res.status(401).end();
  next();
});

// Return currently logged in user information
router.get('/users/me', function(req, res) {
  res.json(req.user);
});

// Create or update user rating for an opinion
router.post('/opinions/:id/ratings', function(req, res) {
});

module.exports = router;
