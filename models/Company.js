'use strict';

const moment = require('moment');
const _ = require('lodash');
const { Op } = require('sequelize');
const slugify = require('../helper/slugify');

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
        const nologoUrl = `${baseUrl}/assets/no_logo.png`;
        if (!this.symbol || !this.active) return nologoUrl;

        return `https://data.wealthica.com/api/securities/${this.symbol.replace(/ ?\([^)]+\)/g, '')}/logo?default=${nologoUrl}`;
      },
    },
    slug: {
      type: DataTypes.VIRTUAL,
      get() {
        return slugify.company(this.symbol);
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/company/view/${this.id}/${this.slug}`;
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
      where: {
        signal_id: [16 /* Top Pick */, 9],
        company_id: { [Op.not]: 1970 /* Market Comment */ },
      },
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
      if (!company || !company.id) return;

      const result = company.toJSON();
      [result.latest_top_pick] = company.Opinions;
      delete result.Opinions;

      return result;
    });
  };

  Company.getCompaniesByPage = function (page = 1, perPage = 25, {
    // NOTE not all filter params are handled (for example desc, sortBy...). This is the same
    // situation as v1. Only handled filter params are listed here
    search, // normal search query
    character = 'all', // filter by start character (alphabetical filter)
    type = 'C', // filter start character in company names. 'S' to filter in company symbols.
  }) {
    const conditions = [{ id: { [Op.ne]: 1970 } }];

    if (search) {
      conditions.push(sequelize.or(
        sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          { [Op.like]: `%${search}%` },
        ),
        sequelize.where(
          sequelize.fn('LOWER', sequelize.col('symbol')),
          { [Op.like]: `%${search}%` },
        ),
      ));
    }

    if (character !== 'all') {
      conditions.push(sequelize.where(
        sequelize.fn('LOWER', sequelize.col(type === 'C' ? 'name' : 'symbol')),
        character === '0-9' ? { [Op.regexp]: '^[0-9]' } : { [Op.like]: `${character}%` },
      ));
    }

    return Company.findAndCountAll({
      col: 'id',
      distinct: true,
      where: conditions.length === 1 ? conditions[0] : sequelize.and(...conditions),
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('Opinions.company_id')), 'opinions_count'],
        ],
      },
      include: [
        {
          model: sequelize.models.Opinion,
          attributes: ['Date', 'company_id'],
        },
      ],
      // TODO find a way to not rely on `group` since it turns result.count into an array
      subQuery: false,
      group: ['Company.id'],
      offset: (page - 1) * perPage,
      limit: perPage,
      order: [[sequelize.fn('MAX', sequelize.col('Opinions.Date')), 'DESC']],
    }).then(result => ({ ...result, count: result.count.length }));
  };

  Company.searchCompanies = function (term = null, limit = 15) {
    return sequelize.query(`
      SELECT
        c.id,
        c.name,
        c.symbol
      FROM New_company AS c
      WHERE
        c.id <> 1970 &&
        ( LOWER(c.name) LIKE :term OR LOWER(c.symbol) LIKE :term )
      ORDER BY c.name ASC`, {
      replacements: {
        term: `%${term.toLowerCase()}%`,
      },
      type: sequelize.QueryTypes.SELECT,
      model: Company,
      mapToModel: true,
    }).then(companies => ({
      rows: companies.slice(0, limit),
      total: companies.length,
    }));
  };

  return Company;
};
