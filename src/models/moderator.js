const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./user");
require("./post");
require("./community");
const ModeratorSchema = new Schema(
  {
    username: {
        type: string,
        ref: 'user',
        required: true,
        unique: true,
    },
    communityName: {
        type: string,
        ref: 'community',
        required: true,
        unique: true,
    },
    managePostsAndComments: {
        type: booleam,
        default: "true",
    },
    manageUsers: {
        type: booleam,
        default: "true",
    },
    manageSettings: {
        type: booleam,
        default: "true",
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("moderator", ModeratorSchema);

module.exports = Message;
