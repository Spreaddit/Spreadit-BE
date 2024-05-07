const Seeder = require("mongoose-data-seed").Seeder;
const conversationModel = require("./../src/models/conversation");

const { data } = require("./../seed-data/conversation");

class ConversationSeeder extends Seeder {
  async shouldRun() {
    return conversationModel
      .countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return conversationModel.create(data);
  }
}

module.exports = ConversationSeeder;
