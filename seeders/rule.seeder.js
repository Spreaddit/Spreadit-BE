const Seeder = require("mongoose-data-seed").Seeder;
const ruleModel = require("./../src/models/rule");

const { data } = require("./../seed-data/rule");

class RuleSeeder extends Seeder {
  async shouldRun() {
    return ruleModel
      .countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return ruleModel.create(data);
  }
}

module.exports = RuleSeeder;
