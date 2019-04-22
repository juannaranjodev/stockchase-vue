const express = require('express');
const _ = require('lodash');

const { Company, Opinion, SocialRating } = require('../models');

const router = express.Router();

function normalizeSymbol(s) {
  /* eslint-disable no-useless-escape */
  // Logic copied from https://github.com/wealthica/wealthica-data/blob/master/app.js
  const symbol = s.toUpperCase();

  // Canadian
  if (symbol.match(/^TSE:/)) return `${symbol.split(':')[1]}-T`;
  if (symbol.match(/^CVE:/)) return `${symbol.split(':')[1]}-X`;
  if (symbol.match(/^CNSX:/)) return `${symbol.split(':')[1]}-CN`; // CSE

  // US
  if (symbol.match(/^NASDAQ:/)) return `${symbol.split(':')[1]}-Q`;

  // For the -N suffix which is generally used for NYSE it gets a litte complicated
  // It seems some symbols on the NYSEARCA, BATS or NYSEAMERICAN (formely AMEX) use -N
  // For example IGM-N is on NYSEARCA, IGV-A on BATS and APT-A on NYSEAMERICAN
  if (symbol.match(/^(NYSE|NYSEARCA|BATS|NYSEAMERICAN):/))
    return ['A', 'N'].map(suffix => `${symbol.split(':')[1]}-${suffix}`);

  // US OTC
  if (symbol.match(/^OTCMKTS:/)) return `${symbol.split(':')[1]}-OTC`;

  // France (Euronext Paris)
  if (symbol.match(/^EPA:/)) return `${symbol.split(':')[1]}-FP`;

  // Germany (Frankfurt)
  if (symbol.match(/^FRA:/)) return ['GR', 'DE'].map(suffix => `${symbol.split(':')[1]}-${suffix}`);

  // Japan
  if (symbol.match(/^TYO:/)) return ['JP', 'TYO'].map(suffix => `${symbol.split(':')[1]}-${suffix}`);

  // Hong Kong
  if (symbol.match(/^HKG:/)) return `${symbol.split(':0000')[1]}-HK`;

  // Korean
  if (symbol.match(/^KRX:/)) return ['KS', 'KRX'].map(suffix => `${symbol.split(':')[1]}-${suffix}`);

  // Fallback to allow anything that "looks" to be a valid symbol
  if (symbol.match(/^[A-Z0-9:\.\-]{1,12}$/)) return symbol;

  /* eslint-enable no-useless-escape */
  return null;
}

// Check company is valid
router.param('id', async (req, res, next, idOrSymbol) => {
  let company;

  if (/^\d+$/.test(idOrSymbol)) {
    // Param is id
    company = await Company.findByPk(idOrSymbol);
  } else {
    // Param is possibly symbol. Normalize and find by symbol.
    const symbol = normalizeSymbol(idOrSymbol);
    if (!symbol) return res.status(400).end();

    // Use only the first company if multiple companies are returned
    company = (await Company.getCompaniesBySymbols(_.flatten([symbol])))[0];
  }

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

// Get company opinions
// TODO Should limit the number of opinions to something reasonable. Since we are going to use this
// for the Bullish / Bearish badges too, maybe it should match the Bullish/Bearish period we want
// ex. 1 year? Once we look at using this API for other things we could add ?form ?to to pull
// opinions for longer periods.
router.get('/:id/opinions', async (req, res) => {
  const opinions = await Opinion.getOpinionsByCompany(req.company.id);

  res.json(opinions);
});

module.exports = router;
