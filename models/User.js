'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    username: {
      type: DataTypes.STRING(30),
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    ad_free: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.group_id > 1;
      },
    },
    editor: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.group_id === 8;
      },
    },
    premium: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.group_id === 3 || this.pro || this.admin;
      },
    },
    pro: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.group_id === 2 || this.admin;
      },
    },
    admin: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.group_id === 9;
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_users',
  });

  User.associate = function (models) {
    User.belongsTo(models.Group);
    User.hasMany(models.SocialRating);
    User.hasMany(models.UserStock);
    User.hasOne(models.UserMeta);
  };

  return User;
};
