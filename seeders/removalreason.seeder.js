const Seeder = require("mongoose-data-seed").Seeder;
const removalReasonModel = require("./../src/models/removalReason");

const { data } = require("./../seed-data/removalreason");

class RemovalReasonSeeder extends Seeder {
  async shouldRun() {
    return removalReasonModel
      .countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return removalReasonModel.create(data);
  }
}

module.exports = RemovalReasonSeeder;
