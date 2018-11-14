'use strict'

module.exports = (sequelize, DataTypes) => {
  var Source = sequelize.define('Source', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      field: 'Name',
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_source',
  });

  return Source;
};
