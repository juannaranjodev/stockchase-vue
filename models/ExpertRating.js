'use strict';

module.exports = (sequelize, DataTypes) => {
  const ExpertRating = sequelize.define('ExpertRating', {
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
  ExpertRating.getRatingsByExpert = function (expertId) {
    return ExpertRating.findAll({
      where: { expert_id: expertId },
      order: [['big_win', 'DESC']],
    });
  };

  function titleCase(str) {
    const urlStr = str.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    const splitStr = urlStr.toLowerCase().split('-');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join('-');
  }

  // Get top/worst experts
  ExpertRating.getTopOrWorstExperts = async function (top = true, limit = 25) {
    const order = top ? 'DESC' : 'ASC';
    return sequelize.query(`
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
        limit,
      },
      type: sequelize.QueryTypes.SELECT,
    }).then((experts) => {
      let beforeExpertId = null;
      let expertRank = 1;
      let totalWins = 0;
      let totalLoses = 0;
      const totalWinsById = {};
      const totalLosesById = {};

      experts.map((expert) => {
        const result = expert;
        if (beforeExpertId !== expert.expert_id) {
          result.expertRank = expertRank++;
          result.avatar = expert.avatar ? `https://stockchase.s3.amazonaws.com/${expert.avatar}` : '/assets/svg/expert_profile_default.svg';
          result.url = `/expert/view/${expert.expert_id}/${titleCase(expert.name)}/rating`;
          totalWinsById[beforeExpertId] = totalWins;
          totalLosesById[beforeExpertId] = totalLoses;
          beforeExpertId = expert.expert_id;
          totalWins = 0;
          totalLoses = 0;
        }
        totalWins += expert.big_win + expert.win;
        totalLoses += expert.big_lose + expert.lose;

        return result;
      });

      totalWinsById[beforeExpertId] = totalWins;
      totalLosesById[beforeExpertId] = totalLoses;

      experts.map((expert) => {
        const result = expert;
        result.totalWins = totalWinsById[expert.expert_id];
        result.totalLoses = totalLosesById[expert.expert_id];
        return result;
      });

      return experts;
    });
  };

  return ExpertRating;
};
