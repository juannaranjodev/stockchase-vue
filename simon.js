const _ = require('lodash');

const Opinion = require('./models').Opinion;

(async function() {
  var recentOpinions = await Opinion.getRecentOpinions();

  console.assert(recentOpinions.length);

  for (let opinion of recentOpinions) {
    console.log(opinion.toJSON());
  }

  console.log(
    await recentOpinions[0].getNewerOpinionDate(),
    await recentOpinions[recentOpinions.length - 1].getOlderOpinionDate(),
  );


  var dateOpinions = await Opinion.getOpinionsByDate('2018-11-12');

  console.log(
    await dateOpinions[0].getNewerOpinionDate(),
    await dateOpinions[dateOpinions.length - 1].getOlderOpinionDate(),
  );

  process.exit();
})();

