'use strict'

module.exports = (sequelize, DataTypes) => {
  var Expert = sequelize.define('Expert', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    title: {
      type: DataTypes.STRING(50),
      field: 'TITLE',
     },
    url: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return `/expert/view/${this.id}/${this.name.replace(/\W+/g, ' ').replace(/\s+/g, '-')}`;
      },
    },
    avatar_path: {
      type: DataTypes.TEXT,
      field: 'avatar',
    },
    avatar: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return `https://stockchase.s3.amazonaws.com/${this.avatar_path}`;
      },
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_expert',
  });

  Expert.associate = function(models) {
    Expert.hasMany(models.Opinion);
  };

  return Expert;
};
