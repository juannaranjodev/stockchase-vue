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
    ad_free: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return this.group_id > 1;
      },
    },
    premium: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return this.group_id === 3 || this.pro || this.admin;
      },
    },
    pro: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return this.group_id === 2 || this.admin;
      },
    },
    admin: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return this.group_id === 9;
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_users',
  });

  User.associate = function(models) {
    User.belongsTo(models.Group);
    User.hasMany(models.SocialRating);
  };

  return User;
};
