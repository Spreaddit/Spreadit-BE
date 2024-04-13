const Seeder = require("mongoose-data-seed").Seeder;
const communityModel = require("./../src/models/community");

const { data } = require("./../seed-data/community");

class CommunitySeeder extends Seeder {
  async shouldRun() {
    return communityModel
      .countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return communityModel.create(data);
  }
}

module.exports = CommunitySeeder;
