'use strict';

const moment = require('moment');
const _ = require('lodash');
const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Opinion = sequelize.define('Opinion', {
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
      type: DataTypes.DECIMAL(19, 3),
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
      get() {
        return `/opinions/view/${this.id}`;
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_opinion',
    scopes: {
      includeAll() {
        return {
          order: [['date', 'DESC'], ['id', 'ASC']],
          include: [
            { model: sequelize.models.Expert },
            { model: sequelize.models.Subject },
            { model: sequelize.models.Signal },
            { model: sequelize.models.Ownership },
            { model: sequelize.models.Source },
            { model: sequelize.models.SocialRating },
            {
              model: sequelize.models.Company,
              include: [sequelize.models.Sector],
              // NOTE is seems this required:true is causing a problem with Opinion.findAndCountAll,
              // making mismatch count vs actual data set & leading to inaccurate pagination
              required: true, // exclude if company not found
            },
          ],
        };
      },

      withExistingCompany() {
        return {
          include: [
            {
              model: sequelize.models.Company,
              required: true, // exclude if company not found
            },
          ],
        };
      },
    },
  });

  Opinion.associate = function (models) {
    Opinion.belongsTo(models.Company);
    Opinion.belongsTo(models.Source);
    Opinion.belongsTo(models.Expert);
    Opinion.belongsTo(models.Subject);
    Opinion.belongsTo(models.Signal);
    Opinion.belongsTo(models.Ownership);
    Opinion.hasMany(models.SocialRating, {
      foreignKey: 'content_id',
      constraints: false,
      scope: {
        content_type: 'opinion',
      },
    });
  };

  // Get the date of the most recent opinion
  Opinion.getRecentOpinionDate = async function () {
    const recentOpinion = await Opinion.scope('withExistingCompany').findOne({
      where: { company_id: { [Op.ne]: 1970 } }, // Ignore market comments
      order: [['date', 'DESC'], ['id', 'ASC']],
    });

    return recentOpinion.date;
  };

  // Get the date of the most recent market comment
  Opinion.getRecentMarketCommentDate = async function () {
    const recentOpinion = await Opinion.findOne({
      where: { company_id: 1970 }, // Market comments
      order: [['date', 'DESC'], ['id', 'ASC']],
    });

    return recentOpinion.date;
  };

  // Given a date returns the number of opinions for adjacent dates (3 days prior, and 3 days ahead)
  // Used for pagination
  Opinion.getAdjacentOpinionDates = async function (date) {
    return sequelize.query(`
      ( SELECT
          Date, COUNT(*)
        FROM New_opinion
        WHERE Date <= :date
        AND company_id != 1970
        GROUP BY Date
        ORDER BY Date DESC
        LIMIT 7 )
      UNION (
        SELECT
          Date, COUNT(*)
        FROM New_opinion
        WHERE Date > :date
        AND company_id != 1970
        GROUP BY Date
        ORDER BY Date ASC
        LIMIT 3 )
      ORDER BY Date DESC
    `, {
      replacements: { date: moment(date).format('YYYY-MM-DD') },
      type: sequelize.QueryTypes.SELECT,
    }).then(datesCount => _.map(_.take(datesCount, 7), dateCount => ({
      date: dateCount.Date,
      count: dateCount['COUNT(*)'],
    })));
  };

  // Given a date returns the no. of mrkt comments for adjacent dates (3 days prior + 3 days ahead)
  // Used for pagination
  Opinion.getAdjacentMarketCommentDates = async function (date) {
    return sequelize.query(`
      ( SELECT
          Date, COUNT(*)
        FROM New_opinion
        WHERE Date <= :date
        AND company_id = 1970
        GROUP BY Date
        ORDER BY Date DESC
        LIMIT 7 )
      UNION (
        SELECT
          Date, COUNT(*)
        FROM New_opinion
        WHERE Date > :date
        AND company_id = 1970
        GROUP BY Date
        ORDER BY Date ASC
        LIMIT 3 )
      ORDER BY Date DESC
    `, {
      replacements: { date: moment(date).format('YYYY-MM-DD') },
      type: sequelize.QueryTypes.SELECT,
    }).then(datesCount => _.map(_.take(datesCount, 7), dateCount => ({
      date: dateCount.Date,
      count: dateCount['COUNT(*)'],
    })));
  };

  // Get opinions for a given date
  Opinion.getOpinionsByDate = function (date) {
    return Opinion.scope('includeAll').findAll({
      where: { date, company_id: { [Op.ne]: 1970 } }, // Ignore market comments
    });
  };

  // Get normal opinions by expert id & date
  Opinion.getOpinionsByExpert = function (expertId, date, limit) {
    return Opinion.scope('includeAll').findAll({
      where: {
        date, company_id: { [Op.ne]: 1970 }, expert_id: expertId, signal_id: { [Op.ne]: 16 },
      },
      limit,
    });
  };

  // Get top picks by expert id & date
  Opinion.getExpertTopPicksByDate = function (expertId, date, limit) {
    return Opinion.scope('includeAll').findAll({
      where: {
        date, company_id: { [Op.ne]: 1970 }, expert_id: expertId, signal_id: 16,
      },
      limit,
    });
  };

  // Get top picks by expert id (including past top picks as in v1 logic)
  Opinion.getExpertTopPicks = function (expertId, limit) {
    return Opinion.scope('includeAll').findAll({
      where: {
        company_id: { [Op.ne]: 1970 }, expert_id: expertId, signal_id: { [Op.or]: [9, 16] },
      },
      limit,
    });
  };

  // Get market comments for a given date
  Opinion.getMarketCommentsByDate = function (date) {
    return Opinion.scope('includeAll').findAll({
      where: { date, company_id: 1970 }, // Market comments
    });
  };

  // Get company opinions by date range
  Opinion.getCompanyOpinionsByRange = function (companyId, from, to) {
    // By default return opinions for the last 12 months
    const [fromDate, toDate] = [
      from || moment().subtract(12, 'months').startOf('month').toDate(),
      to || new Date(),
    ].map(date => moment(date).format('YYYY-MM-DD'));

    return Opinion.scope('includeAll').findAll({
      where: { company_id: companyId, date: { [Op.between]: [fromDate, toDate] } },
    });
  };

  // Get company opinions by page + all company opinions count. result: { rows: [], count: 1 }
  Opinion.getCompanyOpinionsByPage = function (companyId, page = 1, perPage = 15) {
    return Opinion.scope('includeAll').findAndCountAll({
      col: 'opinion.id',
      distinct: true,
      where: { company_id: companyId },
      offset: (page - 1) * perPage,
      limit: perPage,
    });
  };

  // Get expert opinions by page + all expert opinions count. result: { rows: [], count: 1 }
  Opinion.getExpertOpinionsByPage = function (expertId, page = 1, perPage = 15) {
    return Opinion.scope('includeAll').findAndCountAll({
      col: 'opinion.id',
      distinct: true,
      where: { expert_id: expertId },
      offset: (page - 1) * perPage,
      limit: perPage,
    });
  };

  // Get the date of the first opinion by expert
  Opinion.getExpertFirstOpinionDate = async function (expertId) {
    const firstOpinion = await Opinion.scope('withExistingCompany').findOne({
      where: { expert_id: expertId },
      order: [['date', 'ASC']],
    });

    return firstOpinion ? firstOpinion.date : null;
  };

  // Get top picks by page + all top picks count. result: { rows: [], count: 1 }
  Opinion.getTopPicksByPage = function (page = 1, perPage = 15) {
    return Opinion.scope('includeAll').findAndCountAll({
      col: 'opinion.id',
      distinct: true,
      where: { company_id: { [Op.ne]: 1970 }, signal_id: 16 },
      offset: (page - 1) * perPage,
      limit: perPage,
    });
  };

  return Opinion;
};
