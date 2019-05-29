'use strict';

module.exports = (sequelize, DataTypes) => {
  const TopPickPerformance = sequelize.define('TopPickPerformance', {
    opinion_id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
    },
    one_month: {
      type: DataTypes.STRING(10),
      field: '1Month',
    },
    six_months: {
      type: DataTypes.STRING(10),
      field: '6Months',
    },
    twelve_months: {
      type: DataTypes.STRING(10),
      field: '12Months',
    },
    two_years: {
      type: DataTypes.STRING(10),
      field: '2Years',
    },
    five_years: {
      type: DataTypes.STRING(10),
      field: '5Years',
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'new_top_picks',
  });

  TopPickPerformance.associate = function (models) {
    TopPickPerformance.belongsTo(models.Opinion);
  };

  return TopPickPerformance;
};
