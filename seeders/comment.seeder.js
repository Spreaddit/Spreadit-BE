const Seeder = require("mongoose-data-seed").Seeder;
const commentModel = require("./../src/models/comment");

const { data } = require("./../seed-data/comment");

class CommentSeeder extends Seeder {
  async shouldRun() {
    return commentModel
      .countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return commentModel.create(data);
  }
}

module.exports = CommentSeeder;
