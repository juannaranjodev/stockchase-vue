'use strict'

module.exports = (sequelize, DataTypes) => {
  var Opinion = sequelize.define('Opinion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
    },
    source_id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
    },
    subject_id: {
      type: DataTypes.INTEGER,
    },
    signal_id: {
      type: DataTypes.INTEGER,
    },
    ownership_id: {
      type: DataTypes.INTEGER,
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
  };

  // Get the date of the most recent opinion
  Opinion.getRecentOpinionDate = async function() {
    var recentOpinion = await Opinion.findOne({ order: [['date', 'DESC'], ['id', 'ASC']] });
    return recentOpinion.date;
  };

  // Retrieve the most recent opinions
  Opinion.getRecentOpinions = async function() {
    var date = await Opinion.getRecentOpinionDate();
    return Opinion.getOpinionsByDate(date);
  };

  // Retrieve opinions for a given date
  Opinion.getOpinionsByDate = function(date) {
    return Opinion.findAll({
      where: { date: date },
      order: [['date', 'DESC'], ['id', 'ASC']],
      include: [ { all: true } ],
    });
  };

  Opinion.prototype.getNewerOpinionDate = async function() {
    var newerOpinion = await Opinion.findOne({
      where: { date: { $gt: this.date }},
      order: [['date', 'ASC']],
    });

    return (newerOpinion) ? newerOpinion.date : undefined;
  };

  Opinion.prototype.getOlderOpinionDate = async function() {
    var olderOpinion = await Opinion.findOne({
      where: { date: { $lt: this.date }},
      order: [['date', 'DESC']],
    });

    return (olderOpinion) ? olderOpinion.date : undefined;
  };

  return Opinion;
};
