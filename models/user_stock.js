'use strict'

module.exports = (sequelize, DataTypes) => {
  var UserStock = sequelize.define('UserStock', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER(10),
    },
    company_id: {
      type: DataTypes.INTEGER(10),
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'new_userstocks',
  });

  UserStock.associate = function(models) {
    UserStock.belongsTo(models.User);
  };

  return UserStock;
};
