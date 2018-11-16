'use strict'

module.exports = (sequelize, DataTypes) => {
  var Opinion = sequelize.define('Opinion', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER(10),
    },
    source_id: {
      type: DataTypes.INTEGER(10),
    },
    date: {
      type: DataTypes.DATEONLY,
      field: 'Date',
    },
    price: {
      type: DataTypes.DECIMAL(19,3),
      field: 'PRICE',
    },
    comment: {
      type: DataTypes.TEXT('medium'),
    },
    expert_id: {
      type: DataTypes.INTEGER(10),
    },
    subject_id: {
      type: DataTypes.INTEGER(10),
    },
    signal_id: {
      type: DataTypes.INTEGER(10),
    },
    ownership_id: {
      type: DataTypes.INTEGER(10),
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return `/opinions/${this.date}#${this.id}`;
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'New_opinion',
  });

  Opinion.associate = function(models) {
    Opinion.belongsTo(models.Company);
    Opinion.belongsTo(models.Source);
    Opinion.belongsTo(models.Expert);
    Opinion.belongsTo(models.Subject);
    Opinion.belongsTo(models.Signal);
    Opinion.belongsTo(models.Ownership);
  };

  // Get the date of the most recent opinion
  Opinion.getRecentOpinionDate = async function() {
    var recentOpinion = await Opinion.findOne({ order: [['date', 'DESC'], ['id', 'ASC']] });
    return recentOpinion.date;
  };

  // Get opinions for the most recently available date
  Opinion.getRecentOpinions = async function() {
    var date = await Opinion.getRecentOpinionDate();
    return Opinion.getOpinionsByDate(date);
  };

  // Get opinions for a given date
  Opinion.getOpinionsByDate = function(date) {
    return Opinion.findAll({
      where: { date: date, company_id: { $ne: 1970 } }, // ignore market comment
      order: [['date', 'DESC'], ['id', 'ASC']],
      include: [ { all: true, nested: true } ],
    });
  };

  // Given a date return the most recent following date that has an opinion (used for pagination)
  Opinion.getNewerOpinionDate = async function(date) {
    var newerOpinion = await Opinion.findOne({
      where: { date: { $gt: date }},
      order: [['date', 'ASC']],
    });

    return (newerOpinion) ? newerOpinion.date : undefined;
  };

  // Given a date return the most recent preceding date that has an opinion (used for pagination)
  Opinion.getOlderOpinionDate = async function(date) {
    var olderOpinion = await Opinion.findOne({
      where: { date: { $lt: date }},
      order: [['date', 'DESC']],
    });

    return (olderOpinion) ? olderOpinion.date : undefined;
  };

  return Opinion;
};
