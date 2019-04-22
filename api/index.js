const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const urldecode = require('locutus/php/url/urldecode');
const unserialize = require('locutus/php/var/unserialize');
const glob = require('glob');
const path = require('path');

const { User } = require('../models');

const router = express.Router();

router.use(bodyParser.json());

// Extract session data from CodeIgniter ci_session cookie
router.use(async (req, res, next) => {
  if (!req.headers.authorization) return next();

  const [scheme, token] = req.headers.authorization.split(' ');
  if (scheme !== 'Bearer' || !token || token.length <= 40) return next();

  const signature = token.slice(-40);
  const sessionData = urldecode(token.slice(0, -40));

  // Return immediately if signature don't match
  const hmac = crypto.createHmac('sha1', process.env.SESSION_KEY).update(sessionData).digest('hex');
  if (hmac !== signature) return next();

  req.session = unserialize(sessionData);
  req.user = await User.findByPk(req.session.user_id, { include: [{ all: true }] });

  next();
});

// Deny all access for unauthenticated API call
router.use((req, res, next) => {
  // Allow unauthenticated call to non user-specific endpoints so that they can be globally cached
  if (req.method === 'GET') {
    if (req.path.match(/^\/v2\/companies\/.*\/opinions$/)) return next();
  }

  if (!req.user || !req.user.active) return res.status(401).end();

  // Check for sessions older than 30 days
  if (req.session.last_activity + (60 * 60 * 24 * 30) < Date.now() / 1000) {
    return res.status(401).end();
  }

  next();
});

// Load API routes
glob.sync('./api/!(index).js').forEach((filename) => {
  router.use(`/v2/${path.basename(filename, '.js')}`, require(`./${path.basename(filename)}`));
});

module.exports = router;
