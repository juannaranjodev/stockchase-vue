'use strict'

const moment = require('moment');
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
  var Company = sequelize.define('Company', {
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
      get: function() {
        return `https://data.wealthica.com/api/securities/${this.symbol}/logo?default=https://stockchase.com/no_logo.png`;
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return `/company/view/${this.id}/${this.symbol}`;
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_company',
  });

  Company.associate = function(models) {
    Company.belongsTo(models.Sector);
    Company.hasMany(models.Opinion);
  };

  // Get the 10 companies with the most opinions in the last 3 months
  Company.getTrendingCompanies = async function() {
    var fromDate = moment().subtract(3, 'months').toDate();

    var opinions = await sequelize.models.Opinion.findAll({
      attributes: ['company_id', [sequelize.fn('COUNT', sequelize.col('company_id')), 'counts']],
      where: { date: { $gte: fromDate }, company_id: { $not: 1970 /* Market Comment */ }},
      group: [ 'company_id' ],
      order: [[sequelize.literal('counts'), 'DESC']],
      include: [ 'Company' ],
      limit: 10,
    });

    return _.map(opinions, 'Company');
  };

  // Get the 10 companies with most recent Top Pick or Past Top Pick
  // FIXME: Will not return 10 companies if the same company was mentioned more than once
  Company.getRecentTopPickCompanies = async function() {
    var opinions = await sequelize.models.Opinion.findAll({
      where: { signal_id: [ 16 /* Top Pick */, 9 /* Past Top Pick */ ], company_id: { $not: 1970 /* Market Comment */ } },
      order: [['date', 'DESC'], ['id', 'ASC']],
      include: [ 'Company' ],
      limit: 10,
    });

    // Return unique companies
    // TODO: Find a way to do this directly in SQL
    return _(opinions).uniqBy('company_id').map('Company').value();
  };

  return Company;
};
