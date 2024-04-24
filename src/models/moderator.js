const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./user");
require("./post");
require("./community");
const ModeratorSchema = new Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true,
    },
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'community',
        required: true,
        unique: true,
    },

  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("moderator", ModeratorSchema);

module.exports = Message;
