'use strict'

module.exports = (sequelize, DataTypes) => {
  var Ownership = sequelize.define('Ownership', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
     },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_ownership',
  });

  return Ownership;
};
