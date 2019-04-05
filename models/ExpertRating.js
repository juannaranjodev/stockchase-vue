'use strict'

module.exports = (sequelize, DataTypes) => {
  var ExpertRating = sequelize.define('ExpertRating', {
    expert_id: {
      type: DataTypes.INTEGER(10),
    },
    period: {
      type: DataTypes.STRING(10),
    },
    big_lose: {
      type: DataTypes.INTEGER(10),
    },
    lose: {
      type: DataTypes.INTEGER(10),
    },
    no_change: {
      type: DataTypes.INTEGER(10),
    },
    win: {
      type: DataTypes.INTEGER(10),
    },
    big_win: {
      type: DataTypes.INTEGER(10),
    },
    total_tp: {
      type: DataTypes.INTEGER(10),
    },
    companies: {
      type: DataTypes.INTEGER(10),
    },
    deactivated: {
      type: DataTypes.INTEGER(10),
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'new_expert_rates',
  });

  // This is necessary because the table does not have a primary key column
  ExpertRating.removeAttribute('id');

  // Get ratings by expert id
  ExpertRating.getRatingsByExpert = function(expertId) {
    return ExpertRating.findAll({
      where: { expert_id: expertId },
      order: [['big_win', 'DESC']],
    });
  };

  // Get top/worst experts
  ExpertRating.getTopOrWorstExperts = async function(top = true, limit = 25) {
    const order = top ? 'DESC' : 'ASC'
    return await sequelize.query(`
      SELECT
        new_expert_rates.*,
        top_rates.rate,
        new_expert.name,
        new_expert.avatar
      FROM
        (
          SELECT
            expert_id,
            AVG(
              CASE
                WHEN big_win + win - lose - big_lose > 10  THEN 5
                WHEN big_win + win - lose - big_lose < 11 AND big_win + win - lose - big_lose > 0 THEN 4
                WHEN big_win + win - lose - big_lose > -11 AND big_win + win - lose - big_lose < 0 THEN 2
                WHEN big_win + win - lose - big_lose < -11  THEN 1
                ELSE 3
              END
            ) AS rate,
            SUM(big_win + win) AS wins
          FROM new_expert_rates
          GROUP BY expert_id
          ORDER BY rate ${order}, wins ${order}
          LIMIT :limit
        ) AS top_rates,
        new_expert_rates,
        new_expert
      where
        top_rates.expert_id = new_expert_rates.expert_id AND
        top_rates.expert_id = new_expert.id
      ORDER BY top_rates.rate ${order}, top_rates.wins ${order}, top_rates.expert_id, FIELD(new_expert_rates.period, '1 Month', '6 Months', '12 Months', '2 Years', '5 Years');
    `, {
      replacements: {
        limit
      },
      type: sequelize.QueryTypes.SELECT
    }).then(experts => {
      let beforeExpertId = null
      let expertRank = 1
      return experts.map(expert => {
        expert.avatar = expert.avatar ? `https://stockchase.s3.amazonaws.com/${expert.avatar}` : '/assets/svg/expert_profile_default.svg'
        expert.url = `/expert/view/${expert.expert_id}/${this.name.replace(/\W+/g, ' ').replace(/\s+/g, '-')}`
        if (beforeExpertId !== expert.expert_id) {
          beforeExpertId = expert.expert_id
          expert.expertRank = expertRank++
        }
        return expert
      })
    })
  }

  return ExpertRating
};
