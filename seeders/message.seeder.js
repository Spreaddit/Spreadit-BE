const Seeder = require("mongoose-data-seed").Seeder;
const messageModel = require("./../src/models/message");

const { data } = require("./../seed-data/message");

class MessageSeeder extends Seeder {
  async shouldRun() {
    return messageModel
      .countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return messageModel.create(data);
  }
}

module.exports = MessageSeeder;
