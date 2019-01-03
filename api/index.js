const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const urldecode = require('locutus/php/url/urldecode');
const unserialize = require('locutus/php/var/unserialize');
const glob = require('glob');
const path = require('path');

const User = require('../models').User;

const router = express.Router();

router.use(bodyParser.json());

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

// Load API routes
glob.sync('./api/!(index).js').forEach(function(filename) {
  router.use('/v2/' + path.basename(filename, '.js'), require('./' + path.basename(filename)));
});

module.exports = router;
