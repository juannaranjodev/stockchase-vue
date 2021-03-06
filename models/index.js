'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'mysql://localhost/stockchase', {
  dialect: 'mysql',
  /* eslint-disable-next-line no-console */
  logging: (process.env.NODE_ENV === 'production') ? false : console.log,
  benchmark: true,
});

const db = {
  BlogPost: sequelize.import('BlogPost', require('./BlogPost')),
  Company: sequelize.import('Company', require('./Company')),
  ExpertRating: sequelize.import('ExpertRating', require('./ExpertRating')),
  Expert: sequelize.import('Expert', require('./Expert')),
  Group: sequelize.import('Group', require('./Group')),
  Opinion: sequelize.import('Opinion', require('./Opinion')),
  Ownership: sequelize.import('Ownership', require('./Ownership')),
  Sector: sequelize.import('Sector', require('./Sector')),
  Signal: sequelize.import('Signal', require('./Signal')),
  SocialRating: sequelize.import('SocialRating', require('./SocialRating')),
  Source: sequelize.import('Source', require('./Source')),
  Subject: sequelize.import('Subject', require('./Subject')),
  User: sequelize.import('User', require('./User')),
  UserMeta: sequelize.import('UserMeta', require('./UserMeta')),
  UserStock: sequelize.import('UserStock', require('./UserStock')),
  TopPickPerformance: sequelize.import('TopPickPerformance', require('./TopPickPerformance')),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
