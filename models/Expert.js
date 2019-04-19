'use strict';

const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
  const Expert = sequelize.define('Expert', {
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
    style: {
      type: DataTypes.STRING(20),
      field: 'STYLE',
    },
    comments: {
      type: DataTypes.STRING(80),
      field: 'COMMENTS',
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      field: 'RATING',
    },
    address1: {
      type: DataTypes.STRING(50),
    },
    address2: {
      type: DataTypes.STRING(50),
    },
    city: {
      type: DataTypes.STRING(30),
    },
    prov: {
      type: DataTypes.STRING(2),
    },
    postal: {
      type: DataTypes.STRING(10),
    },
    telephone: {
      type: DataTypes.STRING(20),
    },
    website: {
      type: DataTypes.STRING(100),
    },
    toll_free: {
      type: DataTypes.STRING(20),
      field: 'TollFree',
    },
    fax: {
      type: DataTypes.STRING(20),
      field: 'Fax',
    },
    email: {
      type: DataTypes.STRING(50),
      field: 'EMail',
    },
    bio: {
      type: DataTypes.TEXT(),
    },
    first_name: {
      type: DataTypes.STRING(25),
      field: 'FirstName',
    },
    last_name: {
      type: DataTypes.STRING(25),
      field: 'LastName',
    },
    spec_region: {
      type: DataTypes.INTEGER(11),
      field: 'SpecRegion',
    },
    spec_type: {
      type: DataTypes.INTEGER(11),
      field: 'SpecType',
    },
    spec_sub_type: {
      type: DataTypes.INTEGER(11),
      field: 'SpecSubType',
    },
    spec_extra: {
      type: DataTypes.INTEGER(11),
      field: 'SpecExtra',
    },
    ad_campaign_id: {
      type: DataTypes.INTEGER(11),
      field: 'adCampaign_id',
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/expert/view/${this.id}/${this.name.replace(/\W+/g, ' ').replace(/\s+/g, '-')}`;
      },
    },
    avatar_path: {
      type: DataTypes.TEXT,
      field: 'avatar',
    },
    avatar: {
      type: DataTypes.VIRTUAL,
      get() {
        return (this.avatar_path) ? `https://stockchase.s3.amazonaws.com/${this.avatar_path}` : '/assets/svgs/expert_profile_default.svg';
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_expert',
  });

  Expert.associate = function (models) {
    Expert.hasMany(models.Opinion);
    Expert.hasMany(models.SocialRating, {
      foreignKey: 'content_id',
      constraints: false,
      scope: {
        content_type: 'expert',
      },
    });
  };

  Expert.getTotalExperts = async function (term = null) {
    const result = await Expert.count({
      where: term ? {
        $and: [
          {
            id: { $ne: 1176 },
          },
          sequelize.where(
            sequelize.fn('lower', sequelize.col('name')),
            {
              $like: `%${term}%`,
            },
          ),
        ],
      } : { id: { $ne: 1176 } },
    });
    return result;
  };

  Expert.getExpertsByPage = async function (page = 1, limit = 25) {
    return sequelize.query(`
      SELECT
        e.id,
        e.name,
        e.FirstName AS first_name,
        e.LastName AS last_name,
        e.TITLE as title,
        e.COMPANY as company,
        IFNULL(o.total_opinion, 0) AS total_opinion,
        o.latest_opinion_date,
        e.avatar
      FROM New_expert AS e
      LEFT JOIN (
        SELECT
          o.expert_id,
          COUNT(o.expert_id) AS total_opinion,
          MAX(o.Date) AS latest_opinion_date
        FROM New_opinion AS o
        GROUP BY o.expert_id
        ORDER BY latest_opinion_date DESC) AS o
        ON o.expert_id = e.id
      WHERE e.id <> 1176
      ORDER BY o.latest_opinion_date desc
      LIMIT :limit
      OFFSET :offset`, {
      replacements: {
        limit,
        offset: (page - 1) * limit,
      },
      type: sequelize.QueryTypes.SELECT,
    }).then(experts => _.map(experts, (expert) => {
      return {
        ...expert,
        avatar: expert.avatar
          ? `https://stockchase.s3.amazonaws.com/${expert.avatar}`
          : '/assets/svgs/expert_profile_default.svg',
      };
    }));
  };

  Expert.getNewestExperts = function (limit = 15) {
    return Expert.findAll({
      limit,
      order: [['id', 'DESC']],
    });
  };

  Expert.getLatestOpinionExperts = function (limit = 15) {
    return sequelize.query(`
      SELECT
        expert_id,
        Date
      FROM New_opinion
      WHERE company_id <> 1970
      GROUP BY Date, expert_id
      ORDER BY Date DESC, id ASC
      LIMIT 0, :limit`, {
      replacements: { limit },
    });
  };

  Expert.getExpertsByName = function (term, page = 1, limit = 15) {
    return sequelize.query(`
      SELECT
        e.id,
        e.name,
        e.FirstName AS first_name,
        e.LastName AS last_name,
        e.TITLE as title,
        e.COMPANY as company,
        IFNULL(o.total_opinion, 0) AS total_opinion,
        o.latest_opinion_date,
        e.avatar
      FROM New_expert AS e
      LEFT JOIN (
        SELECT
          o.expert_id,
          COUNT(o.expert_id) AS total_opinion,
          MAX(o.Date) AS latest_opinion_date
        FROM New_opinion AS o
        GROUP BY o.expert_id
        ORDER BY latest_opinion_date DESC) AS o
        ON o.expert_id = e.id
      WHERE
        e.id <> 1176 &&
        ( LOWER(e.name) LIKE :term )
      ORDER BY o.latest_opinion_date desc
      LIMIT :limit
      OFFSET :offset`, {
      replacements: {
        term: `%${term.toLowerCase()}%`,
        limit,
        offset: (page - 1) * limit,
      },
      type: sequelize.QueryTypes.SELECT,
    }).then(experts => _.map(experts, (expert) => {
      return {
        ...expert,
        avatar: expert.avatar
          ? `https://stockchase.s3.amazonaws.com/${expert.avatar}`
          : '/assets/svgs/expert_profile_default.svg',
      };
    }));
  };

  Expert.searchExperts = function (term, limit = 5) {
    return sequelize.query(`
      SELECT
        e.id,
        e.name,
        e.FirstName AS first_name,
        e.LastName AS last_name,
        e.TITLE as title,
        e.COMPANY as company,
        e.avatar
      FROM New_expert AS e
      WHERE
        e.id <> 1176 &&
        ( LOWER(e.name) LIKE :term )
      ORDER BY e.name ASC`, {
      replacements: {
        term: `%${term.toLowerCase()}%`,
      },
      type: sequelize.QueryTypes.SELECT,
    }).then(experts => ({
      rows: _.map(experts.slice(0, limit), (expert) => {
        return {
          ...expert,
          avatar: expert.avatar
            ? `https://stockchase.s3.amazonaws.com/${expert.avatar}`
            : '/assets/svgs/expert_profile_default.svg',
        };
      }),
      total: experts.length,
    }));
  };

  Expert.getExpertsByCharacter = function (character, column = 'FirstName', page = 1, limit = 15) {
    return sequelize.query(`
      SELECT
        e.id,
        e.name,
        e.FirstName AS first_name,
        e.LastName AS last_name,
        e.TITLE as title,
        e.COMPANY as company,
        IFNULL(o.total_opinion, 0) AS total_opinion,
        o.latest_opinion_date,
        e.avatar
      FROM New_expert AS e
      LEFT JOIN (
        SELECT
          o.expert_id,
          COUNT(o.expert_id) AS total_opinion,
          MAX(o.Date) AS latest_opinion_date
        FROM New_opinion AS o
        GROUP BY o.expert_id
        ORDER BY latest_opinion_date DESC) AS o
        ON o.expert_id = e.id
      WHERE
        e.id <> 1176 &&
        ( LOWER(e.${column}) LIKE :term )
      ORDER BY o.latest_opinion_date desc
      LIMIT :limit
      OFFSET :offset`, {
      replacements: {
        term: `${character.toLowerCase()}%`,
        limit,
        offset: (page - 1) * limit,
      },
      type: sequelize.QueryTypes.SELECT,
    }).then(experts => _.map(experts, (expert) => {
      return {
        ...expert,
        avatar: expert.avatar
          ? `https://stockchase.s3.amazonaws.com/${expert.avatar}`
          : '/assets/svgs/expert_profile_default.svg',
      };
    }));
  };

  Expert.getExpertsTotalByCharacter = function (character, column = 'FirstName') {
    return Expert.count({
      where: {
        $and: [
          {
            id: { $ne: 1176 },
          },
          sequelize.where(
            sequelize.fn('lower', sequelize.col(column)),
            {
              $like: `${character}%`,
            },
          ),
        ],
      },
    });
  };

  return Expert;
};
