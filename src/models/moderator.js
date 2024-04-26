const mongoose = require("mongoose");
const { boolean } = require("yargs");
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
      unique: true,
    },
    communityName: {
      type: String,
      ref: 'community',
      required: true,
      unique: true,
    },
    managePostsAndComments: {
      type: Boolean,
      default: "true",
    },
    manageUsers: {
      type: Boolean,
      default: "true",
    },
    manageSettings: {
      type: Boolean,
      default: "true",
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("moderator", ModeratorSchema);

module.exports = Message;
