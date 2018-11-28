'use strict'

module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
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
    tableName: 'New_subject',
  });

  return Subject;
};
