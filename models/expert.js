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
        return (this.avatar_path) ? `https://stockchase.s3.amazonaws.com/${this.avatar_path}` : '/assets/expert-nopicture.png';
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

  // Get latest experts
  Expert.getLatestExperts = function(limit=15) {
    return sequelize.query(`
      SELECT SQL_CALC_FOUND_ROWS
        e.id,
        e.name,
        e.FirstName AS first_name,
        e.LastName AS last_name,
        e.TITLE,
        e.COMPANY,
        e.COMMENTS,
        IFNULL(o.total_opinion, 0) AS total_opinion,
        o.latest_opinion_date,
        e.avatar as avatar_path
      FROM (New_expert AS e)
      LEFT JOIN (
        SELECT
          o.expert_id,
          COUNT(o.expert_id) AS total_opinion,
          MAX(o.Date) AS latest_opinion_date
        FROM New_opinion
        AS o
        GROUP BY o.expert_id
        ORDER BY latest_opinion_date DESC
      ) AS o
      ON o.expert_id = e.id
      WHERE e.id <> 1176
      ORDER BY o.latest_opinion_date DESC
      LIMIT :limit
    `, {
      replacements: { limit: limit },
      model: Expert,
      mapToModel: true
    });
  };

  // Get newest experts
  Expert.getNewestExperts = function(limit=15) {
    return Expert.findAll({
      limit: limit,
      order: [['id', 'DESC']],
    });
  };

  Expert.getLatestOpinionExperts = function(limit=15) {
    return sequelize.query(`
      SELECT
        expert_id,
        Date
      FROM New_opinion
      WHERE company_id <> 1970
      GROUP BY Date, expert_id
      ORDER BY Date DESC, id ASC
      LIMIT 0, :limit
    `, {
      replacements: { limit: limit }
    });
  }

  return Expert;
};
