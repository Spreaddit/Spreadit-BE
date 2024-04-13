const Seeder = require("mongoose-data-seed").Seeder;
const postModel = require("./../src/models/post");

const { data } = require("./../seed-data/post");

class PostSeeder extends Seeder {
  async shouldRun() {
    return postModel
      .countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return postModel.create(data);
  }
}

module.exports = PostSeeder;
