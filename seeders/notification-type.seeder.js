const Seeder = require("mongoose-data-seed").Seeder;
const notificationTypeModel = require("./../src/models/constants/notificationType");

const { data } = require("./../seed-data/constants/notificationType");

class NotificationTypeSeeder extends Seeder {
  async shouldRun() {
    return notificationTypeModel
      .countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return notificationTypeModel.create(data);
  }
}

module.exports = NotificationTypeSeeder;
