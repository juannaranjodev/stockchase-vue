'use strict'

module.exports = (sequelize, DataTypes) => {
  var Expert = sequelize.define('Expert', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    title: {
      type: DataTypes.STRING(50),
      field: 'TITLE',
     },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_expert',
  });

  return Expert;
};
