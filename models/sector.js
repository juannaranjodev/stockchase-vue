'use strict'

module.exports = (sequelize, DataTypes) => {
  var Sector = sequelize.define('Sector', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(54),
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_sector',
  });

  return Sector;
};
