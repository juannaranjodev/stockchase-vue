'use strict';

const slugify = require('../helper/slugify');

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

  // Get top/worst experts
  ExpertRating.getTopOrWorstExperts = async function (top = true, limit = 25) {
    const order = top ? 'DESC' : 'ASC';
    return sequelize.query(`
      SELECT
        new_expert_rates.*,
        top_rates.rate,
        New_expert.name,
        New_expert.avatar
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
        New_expert
      where
        top_rates.expert_id = new_expert_rates.expert_id AND
        top_rates.expert_id = New_expert.id
      ORDER BY top_rates.rate ${order}, top_rates.wins ${order}, top_rates.expert_id, FIELD(new_expert_rates.period, '1 Month', '6 Months', '12 Months', '2 Years', '5 Years');
    `, {
      replacements: {
        limit,
      },
      type: sequelize.QueryTypes.SELECT,
    }).then((experts) => {
      const results = [];
      let beforeExpertId = null;
      let expertRank = 1;
      let totalWins = 0;
      let totalLoses = 0;
      let totalBigWins = 0;
      let totalBigLoses = 0;
      let totalNoChanges = 0;
      const totalWinsById = {};
      const totalLosesById = {};
      const totalBigLosesById = {};
      const totalBigWinsById = {};
      const totalNoChangesById = {};

      experts.forEach((expert) => {
        if (beforeExpertId !== expert.expert_id) {
          const result = { ...expert };
          result.expertRank = expertRank++;
          result.avatar = expert.avatar ? `https://stockchase.s3.amazonaws.com/${expert.avatar}` : '/assets/svg/expert_profile_default.svg';
          result.url = `/expert/view/${expert.expert_id}/${slugify(expert.name)}/rating`;
          results.push(result);

          totalWinsById[beforeExpertId] = totalWins;
          totalLosesById[beforeExpertId] = totalLoses;
          totalBigWinsById[beforeExpertId] = totalBigWins;
          totalBigLosesById[beforeExpertId] = totalBigLoses;
          totalNoChangesById[beforeExpertId] = totalNoChanges;
          beforeExpertId = expert.expert_id;
          totalWins = 0;
          totalLoses = 0;
          totalBigWins = 0;
          totalBigLoses = 0;
          totalNoChanges = 0;
        }
        totalWins += expert.win;
        totalLoses += expert.lose;
        totalBigWins += expert.big_win;
        totalBigLoses += expert.big_lose;
        totalNoChanges += expert.no_change;

        results.push(expert);
      });

      totalWinsById[beforeExpertId] = totalWins;
      totalLosesById[beforeExpertId] = totalLoses;
      totalBigWinsById[beforeExpertId] = totalBigWins;
      totalBigLosesById[beforeExpertId] = totalBigLoses;
      totalNoChangesById[beforeExpertId] = totalNoChanges;

      results.map((expert) => {
        const result = expert;
        if (expert.expertRank) {
          result.period = 'Overall';
          result.win = totalWinsById[expert.expert_id];
          result.lose = totalLosesById[expert.expert_id];
          result.big_win = totalBigWinsById[expert.expert_id];
          result.big_lose = totalBigLosesById[expert.expert_id];
          result.no_change = totalNoChangesById[expert.expert_id];
        }

        result.totalWins = expert.win + expert.big_win;
        result.totalLoses = expert.lose + expert.big_lose;

        if (!expert.expertRank) {
          const diffWinsAndLoses = result.totalWins - result.totalLoses;
          let rate;
          if (diffWinsAndLoses > 10) {
            rate = 5;
          } else if (diffWinsAndLoses > 0) {
            rate = 4;
          } else if (diffWinsAndLoses === 0) {
            rate = 3;
          } else if (diffWinsAndLoses > -11) {
            rate = 2;
          } else {
            rate = 1;
          }
          result.rate = rate;
        }

        return result;
      });

      return results;
    });
  };

  return ExpertRating;
};
