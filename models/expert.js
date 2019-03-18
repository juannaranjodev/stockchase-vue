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
   company: {
     type: DataTypes.STRING(50),
     field: 'COMPANY',
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
        return (this.avatar_path) ? `https://stockchase.s3.amazonaws.com/${this.avatar_path}` : '/images/expert-nopicture.png';
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

  // Get latest `num` experts
  // TODO change the query to order by latest opinion date
  Expert.getLatestExperts = function(num) {
    return Expert.findAll({
      limit: num || 15,
      order: [['id', 'DESC']],
    });
  };

  return Expert;
};
