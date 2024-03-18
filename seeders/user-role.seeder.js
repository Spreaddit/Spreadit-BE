const Seeder = require("mongoose-data-seed").Seeder;
const userRoleModel = require("./../src/models/constants/userRole");

const { data } = require("./../seed-data/constants/userRole");

class UserRoleSeeder extends Seeder {
  async shouldRun() {
    return userRoleModel
      .countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return userRoleModel.create(data);
  }
}

module.exports = UserRoleSeeder;
