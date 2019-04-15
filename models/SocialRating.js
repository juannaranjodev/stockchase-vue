'use strict';

module.exports = (sequelize, DataTypes) => {
  const SocialRating = sequelize.define('SocialRating', {
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
    date_rated: {
      type: DataTypes.INTEGER(11),
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'social_ratings',
  });

  SocialRating.associate = function (models) {
    SocialRating.belongsTo(models.User);

    // See http://docs.sequelizejs.com/manual/associations.html, Advance Concepts
    SocialRating.belongsTo(models.Opinion, {
      foreignKey: 'content_id',
      constraints: false,
      as: 'opinion',
    });
    SocialRating.belongsTo(models.Company, {
      foreignKey: 'content_id',
      constraints: false,
      as: 'company',
    });
    SocialRating.belongsTo(models.Expert, {
      foreignKey: 'content_id',
      constraints: false,
      as: 'expert',
    });
  };

  return SocialRating;
};
