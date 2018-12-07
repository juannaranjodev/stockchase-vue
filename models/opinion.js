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
        return `/opinions/${this.date}#${this.id}`;
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
      '( SELECT Date,COUNT(*) FROM New_opinion WHERE Date <= :date AND company_id != 1970 GROUP BY Date ORDER BY Date DESC LIMIT 3 )',
      'UNION',
      '( SELECT Date,COUNT(*) FROM New_opinion WHERE Date >= :date AND company_id != 1970 GROUP BY Date ORDER BY Date ASC LIMIT 3 )',
      'ORDER BY Date',
    ].join(' '), {
      replacements: { date: moment(date).format('YYYY-MM-DD') },
      type: sequelize.QueryTypes.SELECT,
    }).then(function(datesCount) {
      return _.map(datesCount, 'Date');
    });
  };

  // Given a date returns the number of market comments for adjacent dates (3 days prior, and 3 days ahead)
  // Used for pagination
  Opinion.getAdjacentMarketCommentDates = async function(date) {
    return sequelize.query([
      '( SELECT Date,COUNT(*) FROM New_opinion WHERE Date <= :date AND company_id = 1970 GROUP BY Date ORDER BY Date DESC LIMIT 3 )',
      'UNION',
      '( SELECT Date,COUNT(*) FROM New_opinion WHERE Date >= :date AND company_id = 1970 GROUP BY Date ORDER BY Date ASC LIMIT 3 )',
      'ORDER BY Date',
    ].join(' '), {
      replacements: { date: moment(date).format('YYYY-MM-DD') },
      type: sequelize.QueryTypes.SELECT,
    }).then(function(datesCount) {
      return _.map(datesCount, 'Date');
    });
  };

  // Get opinions for the most recently available date
  Opinion.getRecentOpinions = async function() {
    var date = await Opinion.getRecentOpinionDate();
    return Opinion.getOpinionsByDate(date);
  };

  // Get opinions for a given date
  Opinion.getOpinionsByDate = function(date) {
    return Opinion.findAll({
      where: { date: date, company_id: { $ne: 1970 } }, // Ignore market comments
      order: [['date', 'DESC'], ['id', 'ASC']],
      include: [ { all: true, nested: true } ],
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

  // Given a date return the most recent following date that has an opinion (used for pagination)
  Opinion.getNewerOpinionDate = async function(date) {
    var newerOpinion = await Opinion.findOne({
      where: { date: { $gt: date }},
      order: [['date', 'ASC']],
    });

    return (newerOpinion) ? newerOpinion.date : undefined;
  };

  // Given a date return the most recent preceding date that has an opinion (used for pagination)
  Opinion.getOlderOpinionDate = async function(date) {
    var olderOpinion = await Opinion.findOne({
      where: { date: { $lt: date }},
      order: [['date', 'DESC']],
    });

    return (olderOpinion) ? olderOpinion.date : undefined;
  };

  // Get the date of the most recent market comment
  Opinion.getRecentMarketCommentDate = async function() {
    var recentOpinion = await Opinion.findOne({
      where: { company_id: 1970 }, // ignore market comment
      order: [['date', 'DESC'], ['id', 'ASC']]
    });
    return recentOpinion.date;
  };


  // Given a date return the most recent following date that has a market comment (used for pagination)
  Opinion.getNewerMarketCommentDate = async function(date) {
    var newerComment = await Opinion.findOne({
      where: { date: { $gt: date }, company_id: 1970 },
      order: [['date', 'ASC']],
    });

    return (newerComment) ? newerComment.date : undefined;
  };

  // Given a date return the most recent preceding date that has a market comment (used for pagination)
  Opinion.getOlderMarketCommentDate = async function(date) {
    var olderComment = await Opinion.findOne({
      where: { date: { $lt: date }, company_id: 1970 },
      order: [['date', 'DESC']],
    });

    return (olderComment) ? olderComment.date : undefined;
  };

  return Opinion;
};
