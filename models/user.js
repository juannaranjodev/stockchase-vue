'use strict'

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(8),
      primaryKey: true,
    },
    group_id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
    },
    email: {
      type: DataTypes.STRING(254),
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_users',
  });

  return User;
};
