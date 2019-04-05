'use strict'

const moment = require('moment');
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
  var Opinion = sequelize.define('Opinion', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER(10),
    },
    source_id: {
      type: DataTypes.INTEGER(10),
    },
    date: {
      type: DataTypes.DATEONLY,
      field: 'Date',
    },
    price: {
      type: DataTypes.DECIMAL(19,3),
      field: 'PRICE',
    },
    comment: {
      type: DataTypes.TEXT('medium'),
    },
    expert_id: {
      type: DataTypes.INTEGER(10),
    },
    subject_id: {
      type: DataTypes.INTEGER(10),
    },
    signal_id: {
      type: DataTypes.INTEGER(10),
    },
    ownership_id: {
      type: DataTypes.INTEGER(10),
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return `/opinions/view/${this.id}`;
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_opinion',
  });

  Opinion.associate = function(models) {
    Opinion.belongsTo(models.Company);
    Opinion.belongsTo(models.Source);
    Opinion.belongsTo(models.Expert);
    Opinion.belongsTo(models.Subject);
    Opinion.belongsTo(models.Signal);
    Opinion.belongsTo(models.Ownership);
    // FIXME: Need to find how to join social ratings only where content_type="opinion"
    // Currently both opinion and expert ratings are returned
    Opinion.hasMany(models.SocialRating, { foreignKey: 'content_id' });
  };

  // Get the date of the most recent opinion
  Opinion.getRecentOpinionDate = async function() {
    var recentOpinion = await Opinion.findOne({
      where: { company_id: { $ne: 1970 } }, // Ignore market comments
      order: [['date', 'DESC'], ['id', 'ASC']]
    });

    return recentOpinion.date;
  };

  // Get the date of the most recent market comment
  Opinion.getRecentMarketCommentDate = async function() {
    var recentOpinion = await Opinion.findOne({
      where: { company_id: 1970 }, // Market comments
      order: [['date', 'DESC'], ['id', 'ASC']]
    });

    return recentOpinion.date;
  };

  // Given a date returns the number of opinions for adjacent dates (3 days prior, and 3 days ahead)
  // Used for pagination
  Opinion.getAdjacentOpinionDates = async function(date) {
    return sequelize.query([
      '( SELECT Date,COUNT(*) FROM New_opinion WHERE Date <= :date AND company_id != 1970 GROUP BY Date ORDER BY Date DESC LIMIT 7 )',
      'UNION',
      '( SELECT Date,COUNT(*) FROM New_opinion WHERE Date > :date AND company_id != 1970 GROUP BY Date ORDER BY Date ASC LIMIT 3 )',
      'ORDER BY Date DESC',
    ].join(' '), {
      replacements: { date: moment(date).format('YYYY-MM-DD') },
      type: sequelize.QueryTypes.SELECT,
    }).then(function(datesCount) {
      return _.map(_.take(datesCount, 7), function(dateCount) {
        return {
          date: dateCount['Date'],
          count: dateCount['COUNT(*)']
        }
      });
    });
  };

  // Given a date returns the number of market comments for adjacent dates (3 days prior, and 3 days ahead)
  // Used for pagination
  Opinion.getAdjacentMarketCommentDates = async function(date) {
    return sequelize.query([
      '( SELECT Date,COUNT(*) FROM New_opinion WHERE Date <= :date AND company_id = 1970 GROUP BY Date ORDER BY Date DESC LIMIT 7 )',
      'UNION',
      '( SELECT Date,COUNT(*) FROM New_opinion WHERE Date > :date AND company_id = 1970 GROUP BY Date ORDER BY Date ASC LIMIT 3 )',
      'ORDER BY Date DESC',
    ].join(' '), {
      replacements: { date: moment(date).format('YYYY-MM-DD') },
      type: sequelize.QueryTypes.SELECT,
    }).then(function(datesCount) {
      return _.map(_.take(datesCount, 7), function(dateCount) {
        return {
          date: dateCount['Date'],
          count: dateCount['COUNT(*)']
        }
      });
    });
  };

  // Get opinions for a given date
  Opinion.getOpinionsByDate = function(date) {
    return Opinion.findAll({
      where: { date: date, company_id: { $ne: 1970 } }, // Ignore market comments
      order: [['date', 'DESC'], ['id', 'ASC']],
      include: [ { all: true, nested: true } ],
    });
  };

  // Get normal opinions by expert id & date
  Opinion.getOpinionsByExpert = function(expertId, date, limit) {
    return Opinion.findAll({
      where: { date: date, company_id: { $ne: 1970 }, expert_id: expertId, signal_id: { $ne: 16 } },
      order: [['date', 'DESC'], ['id', 'ASC']],
      include: [ { all: true, nested: true } ],
      limit: limit,
    });
  };

  // Get top picks by expert id & date
  Opinion.getTopPicksByExpert = function(expertId, date, limit) {
    return Opinion.findAll({
      where: { date: date, company_id: { $ne: 1970 }, expert_id: expertId, signal_id: 16 },
      order: [['date', 'DESC'], ['id', 'ASC']],
      include: [ { all: true, nested: true } ],
      limit: limit,
    });
  };

  // Get market comments for a given date
  Opinion.getMarketCommentsByDate = function(date) {
    return Opinion.findAll({
      where: { date: date, company_id: 1970 }, // Market comments
      order: [['date', 'DESC'], ['id', 'ASC']],
      include: [ { all: true, nested: true } ],
    });
  };

  return Opinion;
};
