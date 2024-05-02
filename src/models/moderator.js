const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./user");
require("./post");
require("./community");

const ModeratorSchema = new Schema(
  {
    username: {
      type: String,
      ref: 'user',
      required: true,
    },
    communityName: {
      type: String,
      ref: 'community',
      required: true,
    },
    managePostsAndComments: {
      type: Boolean,
      default: true,
    },
    manageUsers: {
      type: Boolean,
      default: true,
    },
    manageSettings: {
      type: Boolean,
      default: true,
    },
    isAccepted: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

ModeratorSchema.index({ username: 1, communityName: 1 }, { unique: true });

const Moderator = mongoose.model("moderator", ModeratorSchema);

module.exports = Moderator;
