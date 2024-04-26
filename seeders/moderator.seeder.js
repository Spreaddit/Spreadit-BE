const Seeder = require("mongoose-data-seed").Seeder;
const moderatorModel = require("./../src/models/moderator");

const { data } = require("./../seed-data/moderator");

class ModeratorSeeder extends Seeder {
  async shouldRun() {
    return moderatorModel
      .countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return moderatorModel.create(data);
  }
}

module.exports = ModeratorSeeder;
