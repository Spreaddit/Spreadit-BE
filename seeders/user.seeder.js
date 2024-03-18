const Seeder = require("mongoose-data-seed").Seeder;
const userModel = require("./../src/models/users");

const { data } = require("./../seed-data/users");

class UserSeeder extends Seeder {
  async shouldRun() {
    return userModel
      .countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return userModel.create(data);
  }
}

module.exports = UserSeeder;
