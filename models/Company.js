'use strict';

const moment = require('moment');
const _ = require('lodash');
const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
    },
    symbol: {
      type: DataTypes.STRING(15),
    },
    name: {
      type: DataTypes.STRING(54),
    },
    sector_id: {
      type: DataTypes.INTEGER(10),
    },
    logo: {
      type: DataTypes.VIRTUAL,
      get() {
        const baseUrl = process.env.APP_URL || 'https://stockchase.com';
        return `https://data.wealthica.com/api/securities/${this.symbol.replace(' (Dead)', '').replace(/[()]/g, '')}/logo?default=${baseUrl}/assets/no_logo.png`;
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/company/view/${this.id}/${this.symbol.replace(' (Dead)', '').replace(/[()]/g, '')}`;
      },
    },
    active_original: {
      type: DataTypes.STRING(1),
      field: 'active',
    },
    active: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.active_original === 'Y';
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_company',
  });

  Company.associate = function (models) {
    Company.belongsTo(models.Sector);
    Company.hasMany(models.Opinion);
    Company.hasMany(models.UserStock);
    Company.hasMany(models.SocialRating, {
      foreignKey: 'content_id',
      constraints: false,
      scope: {
        content_type: 'company',
      },
    });
  };

  // Get the 10 companies with the most opinions in the last 3 months
  Company.getTrendingCompanies = async function () {
    const fromDate = moment().subtract(3, 'months').toDate();

    const opinions = await sequelize.models.Opinion.findAll({
      attributes: ['company_id', [sequelize.fn('COUNT', sequelize.col('company_id')), 'counts']],
      where: { date: { [Op.gte]: fromDate }, company_id: { [Op.not]: 1970 /* Market Comment */ } },
      group: ['company_id'],
      order: [[sequelize.literal('counts'), 'DESC']],
      include: ['Company'],
      limit: 10,
    });

    return _.map(opinions, 'Company');
  };

  // Get the 10 companies with most recent Top Pick or Past Top Pick
  // FIXME: Will not return 10 companies if the same company was mentioned more than once
  Company.getRecentTopPickCompanies = async function () {
    const opinions = await sequelize.models.Opinion.findAll({
      where: { signal_id: [16 /* Top Pick */, 9], company_id: { [Op.not]: 1970 /* Market Comment */ } },
      order: [['date', 'DESC'], ['id', 'ASC']],
      include: ['Company'],
      limit: 10,
    });

    // Return unique companies
    // TODO: Find a way to do this directly in SQL
    return _(opinions).uniqBy('company_id').map('Company').value();
  };

  Company.getCompanyBySymbol = function (symbol) {
    return Company.findOne({
      where: { symbol },
    });
  };

  Company.getCompaniesBySymbols = function (symbols) {
    return Company.findAll({
      where: { symbol: { [Op.in]: symbols } },
    });
  };

  // Get newest `num` companies
  Company.getNewestCompanies = function (num) {
    return Company.findAll({
      limit: num || 15,
      order: [['id', 'DESC']],
    });
  };

  Company.getCompanyById = function (id) {
    return Company.findByPk(id, {
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('UserStocks.id')), 'user_stocks_count'],
        ],
      },
      include: [
        {
          model: sequelize.models.UserStock,
          attributes: [],
        },
        {
          model: sequelize.models.Opinion,
          where: { signal_id: [16 /* Top Pick */, 9] },
          include: [{ model: sequelize.models.Signal }],
          order: [['id', 'DESC']],
          limit: 1,
        },
        { model: sequelize.models.SocialRating },
      ],
    }).then((company) => {
      const result = company.toJSON();
      [result.latest_top_pick] = company.Opinions;
      delete result.Opinions;

      return result;
    });
  };

  Company.getCompaniesByPage = function(page = 1, limit = 25) {
    return sequelize.query(`
      SELECT
        c.id,
        c.name,
        c.symbol,
        IFNULL(o.total_opinion, 0) AS total_opinion,
        o.latest_opinion_date
      FROM New_company AS c
      LEFT JOIN (
        SELECT
          o.company_id,
          COUNT(o.company_id) AS total_opinion,
          MAX(o.Date) AS latest_opinion_date
        FROM New_opinion AS o
        GROUP BY o.company_id
        ORDER BY latest_opinion_date DESC) AS o
        ON o.company_id = c.id
      WHERE
        c.id <> 1970
      ORDER BY o.latest_opinion_date desc
      LIMIT :limit
      OFFSET :offset`, {
      replacements: {
        limit: limit,
        offset: (page - 1) * limit
      },
      type: sequelize.QueryTypes.SELECT,
      model: Company,
      mapToModel: true,
    }).then(function(companies) {
      console.log(companies[0]);
      return companies;
    });
  };

  Company.getCompaniesByName = function(term = null, page = 1, limit = 25) {
    return sequelize.query(`
      SELECT
        c.id,
        c.name,
        c.symbol,
        IFNULL(o.total_opinion, 0) AS total_opinion,
        o.latest_opinion_date
      FROM New_company AS c
      LEFT JOIN (
        SELECT
          o.company_id,
          COUNT(o.company_id) AS total_opinion,
          MAX(o.Date) AS latest_opinion_date
        FROM New_opinion AS o
        GROUP BY o.company_id
        ORDER BY latest_opinion_date DESC) AS o
        ON o.company_id = c.id
      WHERE
        c.id <> 1970 &&
        ( LOWER(c.name) LIKE :term OR LOWER(c.symbol) LIKE :term )
      ORDER BY o.latest_opinion_date desc
      LIMIT :limit
      OFFSET :offset`, {
      replacements: {
        term: `%${term.toLowerCase()}%`,
        limit,
        offset: (page - 1) * limit
      },
      type: sequelize.QueryTypes.SELECT,
      model: Company,
      mapToModel: true,
    }).then(function(companies) {
      return companies;
    });
  };

  Company.getTotalCompanies = async function(term = null){
    var result = await Company.count({
      where: term ? { 
        $and: [
          { 
            id: { $ne: 1970 },
          },
          sequelize.where(
            sequelize.fn('lower', sequelize.col('name')),
            {
              $like: `%${term.toLowerCase()}%`
            }
          )
        ],
      } : { id: { $ne: 1970 } },
    });
    return result;
  }

  return Company;
};
