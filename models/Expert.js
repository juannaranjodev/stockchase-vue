'use strict';

const _ = require('lodash');
const { Op } = require('sequelize');
const slugify = require('../helper/slugify');
const calculateRating = require('../helper/calculateRating');

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
    slug: {
      type: DataTypes.VIRTUAL,
      get() {
        return slugify.expert(this.name);
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/expert/view/${this.id}/${this.slug}`;
      },
    },
    avatar_path: {
      type: DataTypes.TEXT,
      field: 'avatar',
    },
    avatar: {
      type: DataTypes.VIRTUAL,
      get() {
        const baseUrl = process.env.APP_URL || 'https://stockchase.com';
        return (this.avatar_path)
          ? `https://stockchase.s3.amazonaws.com/${this.avatar_path}`
          : `${baseUrl}/assets/svgs/expert_profile_default.svg`;
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_expert',
  });

  Expert.associate = function (models) {
    Expert.hasMany(models.Opinion);
    Expert.hasMany(models.ExpertRating);
    Expert.hasMany(models.SocialRating, {
      foreignKey: 'content_id',
      constraints: false,
      scope: {
        content_type: 'expert',
      },
    });
  };

  Expert.getExpertsByPage = function (page = 1, perPage = 25, {
    // NOTE not all filter params are handled (for example desc, sortBy...). This is the same
    // situation as v1. Only handled filter params are listed here
    search, // normal search query
    character = 'all', // filter by start character (alphabetical filter)
    type = 'F', // filter start character in FirstName. 'L' to filter in LastName.
  }) {
    const conditions = [{ id: { [Op.ne]: 1176 } }];

    if (search) {
      conditions.push(sequelize.where(
        sequelize.fn('LOWER', sequelize.col('name')),
        { [Op.like]: `%${search}%` },
      ));
    }

    if (character !== 'all') {
      conditions.push(sequelize.where(
        sequelize.fn('LOWER', sequelize.col(type === 'F' ? 'FirstName' : 'LastName')),
        character === '0-9' ? { [Op.regexp]: '^[0-9]' } : { [Op.like]: `${character}%` },
      ));
    }

    // First query to get the correct experts total count & list of experts for the page with
    // correct ordering by latest opinion date.
    return Expert.findAndCountAll({
      col: 'id',
      distinct: true,
      where: conditions.length === 1 ? conditions[0] : sequelize.and(...conditions),
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('Opinions.expert_id')), 'opinions_count'],
        ],
      },
      include: [
        {
          model: sequelize.models.Opinion,
          attributes: ['Date', 'expert_id'],
        },
      ],
      // TODO find a way to not rely on `group` since it turns result.count into an array
      subQuery: false,
      group: ['Expert.id'],
      offset: (page - 1) * perPage,
      limit: perPage,
      order: [[sequelize.fn('MAX', sequelize.col('Opinions.Date')), 'DESC']],
    }).then(result => sequelize.models.ExpertRating.findAll({
      // Second query to find all expert ratings for the returned experts to calculate rating
      where: { expert_id: { [Op.in]: _.map(result.rows, 'id') } },
    }).then((expertRatings) => {
      const rows = result.rows.map((row) => {
        const expert = row.toJSON();
        const ratings = expertRatings.filter(rating => rating.expert_id === expert.id);

        return {
          ...expert,
          ...calculateRating(ratings),
        };
      });

      return {
        rows,
        count: result.count.length,
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

  Expert.searchExperts = function (term, limit = 5) {
    return sequelize.query(`
      SELECT
        e.id,
        e.name,
        e.FirstName AS first_name,
        e.LastName AS last_name,
        e.TITLE as title,
        e.COMPANY as company,
        e.avatar as avatar_path
      FROM New_expert AS e
      WHERE
        e.id <> 1176 &&
        ( LOWER(e.name) LIKE :term )
      ORDER BY e.name ASC`, {
      replacements: {
        term: `%${term.toLowerCase()}%`,
      },
      type: sequelize.QueryTypes.SELECT,
      model: Expert,
      mapToModel: true,
    }).then(experts => ({
      rows: experts.slice(0, limit),
      total: experts.length,
    }));
  };

  Expert.getExpertById = function (id) {
    return Expert.findByPk(id, {
      include: [
        { model: sequelize.models.SocialRating },
        // NOTE the ExpertRating include below only returns 1 record due to ExpertRating table not
        // having an id primaryKey. That's why we need to have a separate query for ExpertRatings.
        // Adding an id column to the table might fix this.
        // { model: sequelize.models.ExpertRating },
      ],
    }).then(result => sequelize.models.ExpertRating.getRatingsByExpert(id).then((ratings) => {
      if (!result) return;

      const expert = result.toJSON();
      const rating = calculateRating(ratings);

      return {
        ...expert,
        ...rating,
      };
    }));
  };

  Expert.getLatestExperts = function (limit = 15) {
    return sequelize.query(`
      SELECT SQL_CALC_FOUND_ROWS
        e.id,
        e.name,
        e.FirstName,
        e.LastName,
        e.TITLE,
        e.COMPANY,
        e.COMMENTS,
        IFNULL(o.total_opinion, 0) AS total_opinion,
        o.latest_opinion_date,
        e.avatar as avatar_path
      FROM New_expert AS e
      LEFT JOIN (
        SELECT
          o.expert_id,
          COUNT(o.expert_id) AS total_opinion,
          MAX(o.Date) AS latest_opinion_date
        FROM New_opinion AS o
        GROUP BY o.expert_id
        ORDER BY latest_opinion_date DESC
      ) AS o
      ON o.expert_id = e.id
      WHERE e.id <> 1176
      ORDER BY o.latest_opinion_date DESC
      LIMIT 0, :limit
    `, {
      replacements: { limit },
      type: sequelize.QueryTypes.SELECT,
      model: Expert,
      mapToModel: true,
    });
  };

  return Expert;
};
