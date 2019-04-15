'use strict'

module.exports = (sequelize, DataTypes) => {
  var UserStock = sequelize.define('UserStock', {
    user_id: {
      type: DataTypes.INTEGER(10),
    },
    company_id: {
      type: DataTypes.INTEGER(10),
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_userStocks',
  });

  UserStock.associate = function(models) {
    UserStock.belongsTo(models.User);
    UserStock.belongsTo(models.Company);
  };

  return UserStock;
};
