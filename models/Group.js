'use strict'

module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
    },
    description: {
      type: DataTypes.STRING(100),
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_users_groups',
  });

  return Group;
};
