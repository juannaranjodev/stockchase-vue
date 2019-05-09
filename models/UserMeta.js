'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserMeta = sequelize.define('UserMeta', {
    user_id: {
      type: DataTypes.INTEGER(10),
    },
    opt_in_charts: {
      type: DataTypes.STRING(1),
    },
    chart_enabled: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.opt_in_charts === 'Y';
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'new_users_meta',
    name: {
      singular: 'Meta',
      plural: 'Meta'
    },
  });

  UserMeta.associate = function (models) {
    UserMeta.belongsTo(models.User);
  };

  return UserMeta;
};
