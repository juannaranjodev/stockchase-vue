'use strict'

module.exports = (sequelize, DataTypes) => {
  var SocialRating = sequelize.define('SocialRating', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
    },
    content_type: {
      type: DataTypes.STRING(30),
    },
    content_id: {
      type: DataTypes.INTEGER(11),
    },
    user_id: {
      type: DataTypes.INTEGER(11),
    },
    rating: {
      type: DataTypes.INTEGER(4),
    },
    opinion: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return (this.content_type === 'opinion') ? this.content_id : undefined;
      },
    },
    expert: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return (this.content_type === 'expert') ? this.content_id : undefined;
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'social_ratings',
  });

  SocialRating.associate = function(models) {
    SocialRating.belongsTo(models.User);
  };

  return SocialRating;
};
