'use strict'

module.exports = (sequelize, DataTypes) => {
  var Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    symbol: {
      type: DataTypes.STRING(15),
    },
    name: {
      type: DataTypes.STRING(54),
     },
    logo: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return 'https://data.wealthica.com/securities/NASDAQ:FB/logo';
      },
    },
    sector_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_company',
  });

  Company.associate = function(models) {
    Company.belongsTo(models.Sector);
  };

  return Company;
};
