const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Community = require("./community.js");
require("./user");
require("./post");
require("./community");

const ModeratorSchema = new Schema(
  {
    username: {
      type: String,
      ref: "user",
      required: true,
    },
    communityName: {
      type: String,
      ref: "community",
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
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ModeratorSchema.index({ username: 1, communityName: 1 }, { unique: true });


ModeratorSchema.statics.getModeratorObject = async function (communityName) {
  const community = await Community.findOne({ name: communityName });
  if (!community) {
    return null;
  }
  const moderator = await Moderator.findOne({ communityName: communityName});
  return {
    username: moderator.username,
    communityName,
    managePostsAndComments: moderator.managePostsAndComments,
    manageUsers: moderator.manageUsers,
    manageSettings: moderator.manageSettings,
    isAccepted: moderator.isAccepted,
    moderationDate: moderator.createdAt,
  };
};

ModeratorSchema.statics.getAllModerators = async function (communityName) {
  const community = await Community.findOne({ name: communityName });
  if (!community) {
    return null;
  }
  const moderators = await Moderator.find({ communityName: communityName });
  return moderators.map(moderator => ({
    username: moderator.username,
    communityName,
    managePostsAndComments: moderator.managePostsAndComments,
    manageUsers: moderator.manageUsers,
    manageSettings: moderator.manageSettings,
    isAccepted: moderator.isAccepted,
    moderationDate: moderator.createdAt,
  }));
};


const Moderator = mongoose.model("moderator", ModeratorSchema);

module.exports = Moderator;
