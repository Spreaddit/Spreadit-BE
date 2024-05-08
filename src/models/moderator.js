const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Community = require("./community.js");
const User = require("./user.js");
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
  const community = await this.model("community").findOne({
    name: communityName,
  });
  if (!community) {
    return null;
  }
  const moderator = await Moderator.findOne({
    communityName: communityName,
    isAccepted: true,
  });
  const user = await this.model("user").findOne({
    username: moderator.username,
  });
  return {
    username: moderator.username,
    communityName,
    managePostsAndComments: moderator.managePostsAndComments,
    manageUsers: moderator.manageUsers,
    manageSettings: moderator.manageSettings,
    isAccepted: moderator.isAccepted,
    moderationDate: moderator.createdAt,
    avatar: user.avatar,
  };
};

ModeratorSchema.statics.getAllModerators = async function (communityName) {
  const community = await this.model("community").findOne({
    name: communityName,
  });
  if (!community) {
    return null;
  }

  const moderators = await Moderator.find({
    communityName: communityName,
    isAccepted: true,
  });
  const moderatorObjects = [];
  for (const moderator of moderators) {
    const user = await this.model("user").findOne({
      username: moderator.username,
    });
    moderatorObjects.push({
      username: moderator.username,
      communityName,
      managePostsAndComments: moderator.managePostsAndComments,
      manageUsers: moderator.manageUsers,
      manageSettings: moderator.manageSettings,
      isAccepted: moderator.isAccepted,
      moderationDate: moderator.createdAt,
      avatar: user ? user.avatar : null,
      banner: user ? user.banner : null,
    });
  }
  return moderatorObjects;
};

ModeratorSchema.statics.getInvitedModerators = async function (communityName) {
  const community = await this.model("community").findOne({
    name: communityName,
  });
  if (!community) {
    return null;
  }
  const moderators = await Moderator.find({
    communityName: communityName,
    isAccepted: false,
  });
  const moderatorObjects = [];
  for (const moderator of moderators) {
    const user = await this.model("user").findOne({
      username: moderator.username,
    });
    moderatorObjects.push({
      username: moderator.username,
      communityName,
      managePostsAndComments: moderator.managePostsAndComments,
      manageUsers: moderator.manageUsers,
      manageSettings: moderator.manageSettings,
      isAccepted: moderator.isAccepted,
      moderationDate: moderator.createdAt,
      avatar: user ? user.avatar : null,
      banner: user ? user.banner : null,
    });
  }
  return moderatorObjects;
};

const Moderator = mongoose.model("moderator", ModeratorSchema);

module.exports = Moderator;
