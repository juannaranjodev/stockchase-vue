'use strict'

module.exports = (sequelize, DataTypes) => {
  var Signal = sequelize.define('Signal', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_signal',
  });

  return Signal;
};