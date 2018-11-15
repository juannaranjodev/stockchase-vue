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
        // TODO: Rename default image to follow styleguide and host somewhere on stockchase-v2 code base
        // This default image path is also used by the Wealthica Stockchase add-on careful when renaming
        // Maybe we should move the default image directly into Wealthica Data instead
        return `https://data.wealthica.com/api/securities/${this.symbol}/logo?default=https://stockchase.com/images/no logo icon @2x.png`;
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
    Company.hasMany(models.Opinion);
  };

  return Company;
};
