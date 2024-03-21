const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const config = require("../configuration");
require("./constants/userRole");

const Schema = mongoose.Schema;
const userRole = require("../../seed-data/constants/userRole");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 50,
      default: " ",
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 14,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      trim: true,
    },
    birth_date: {
      type: Date,
    },
    gender: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    country: {
      type: String,
      trim: true,
      maxLength: 30,
      default: "",
    },
    connectedAccounts: [
      {
        type: String,
      },
    ],
    approvedUsers: [
      {
        type: String,
      },
    ],
    bio: {
      type: String,
      trim: true,
      maxLength: 160,
      default: "",
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "user", index: true }],
    followings: [{ type: Schema.Types.ObjectId, ref: "user", index: true }],
    reportedUsers: [
      {
        type: Object,
      },
    ],
    background_picture: {
      type: String,
      trim: true,
      default: "",
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "userRole",
      index: true,
      default: userRole.defaultRole,
    },
    resetToken: {
      type: String,
      default: "",
    },
    resetTokenExpiration: {
      type: Date,
      default: Date.now
    },
    resetPasswordCode: {
      type: Number,
      default: -1,
    },
    newFollowers: {
      type: Boolean,
      default: 1,
    },
    chatRequestEmail: {
      type: Boolean,
      default: 1,
    },
    unsubscribeAllEmails: {
      type: Boolean,
      default: 0,
    },
    communityContentSort: {
      type: String,
      enum: ["Hot", "New", "Top", "Rising"],
      default: "Hot",
    },
    globalContentView: {
      type: String,
      enum: ["Card", "Classic", "Compact"],
      default: "Card",
    },
    communityThemes: {
      type: Boolean,
      default: 1,
    },
    autoplayMedia: {
      type: Boolean,
      default: 1,
    },
    adultContent: {
      type: Boolean,
      default: 0,
    },
    openPostsInNewTab: {
      type: Boolean,
      default: 0,
    },
    mentions: {
      type: Boolean,
      default: 1,
    },
    commentsOnYourPost: {
      type: Boolean,
      default: 1,
    },
    commentsYouFollow: {
      type: Boolean,
      default: 1,
    },
    upvotesComments: {
      type: Boolean,
      default: 1,
    },
    upvotesPosts: {
      type: Boolean,
      default: 1,
    },
    newFollowerEmail: {
      type: Boolean,
      default: 1,
    },
    replies: {
      type: Boolean,
      default: 1,
    },
    newFollowers: {
      type: Boolean,
      default: 1,
    },
    invitations: {
      type: Boolean,
      default: 1,
    },
    posts: {
      type: Boolean,
      default: 0,
    },
    displayName: {
      type: String,
      trim: true,
      maxLength: 20,
    },
    about: {
      type: String,
      trim: true,
      maxLength: 200,
    },
    avatar: {
      type: String,
      trim: true,
      default: "",
    },
    banner: {
      type: String,
      trim: true,
      default: "",
    },
    nsfw: {
      type: Boolean,
      default: false,
    },
    activeInCommunityVisibility: {
      type: Boolean,
      default: true,
    },
    clearHistory: {
      type: Boolean,
      default: false,
    },
    sendYouFriendRequests: {
      type: String,
      enum: ["Everyone", "Accounts Older Than 30 Days", "Nobody"],
      default: "Everyone",
    },
    sendYouPrivateMessages: {
      type: String,
      enum: ["Everyone", "Nobody"],
      default: "Everyone",
    },
    markAllChatsAsRead: {
      type: Boolean,
      default: true,
    },
    allowFollow: {
      type: Boolean,
      default: true,
    },
    blockedUsers: [
      {
        type: String,
      },
    ],
    mutedCommunities: [
      {
        type: String,
      },
    ],
    resetPasswordCodeExpiration: {
      type: Date,
      default: new Date(new Date().setHours(new Date().getHours() + 24)),
    },
    tokens: [
      {
        token: {
          type: String,
        },
        token_expiration_date: {
          type: Date,
          default: new Date(new Date().setHours(new Date().getHours() + 24)),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//hash function
//still verification needs to be figured out and reseting pasword

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }

  next();
});

UserSchema.statics.getUserByEmailOrUsername = async function (usernameOremail) {
  const user = await User.find({
    $or: [{ email: usernameOremail }, { username: usernameOremail }],
  });

  if (user[0]) {
    return new User(user[0]);
  } else {
    return null;
  }
};

UserSchema.methods.generateToken = async function () {
  user = this;

  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    "Spreadit-access-token-CCEC-2024"
  );
  return token;
};

UserSchema.statics.checkExistence = async function (email) {
  const user = await User.findOne({ email });
  if (user) {
    return true;
  } else {
    return false;
  }
};


UserSchema.statics.verifyCredentials = async function (
  usernameOremail,
  password
) {
  // const user = await User.findOne({
  //   $or: [{email: usernameOremail}, {username: usernameOremail}],
  // }).populate("roleId");

  const userByEmail = await User.findOne({
    email: usernameOremail,
  }).populate("roleId");
  const userByUsername = await User.findOne({
    username: usernameOremail,
  }).populate("roleId");
  //console.log(usernameOremail);
  //console.log(userByEmail);
  //console.log(userByUsername);
  const user = userByUsername;
  if (userByEmail) {
    user = userByEmail;
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  } else {
    return null;
  }
};
UserSchema.statics.generateUserObject = async function (
  user,
  authorizedUserName = null
) {
  try {
    const userObj = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      birth_date: user.birth_date,
      phone: user.phone_number,
      avatar_url: user.avatar,
      background_picture_url: user.background_picture,
      location: user.location,
      bio: user.bio,
      followers_count: user.followers.length,
      following_count: user.followings.length,
      created_at: user.createdAt,
      role: user.roleId.name,
      nsfw: user.nsfw,
      activeInCommunityVisibility: user.activeInCommunityVisibility,
      clearHistory: user.clearHistory,
      contentVisibility: user.cosntentVisibility,
      allowFollow: user.allowFollow,
      blockedUsers: user.blockedUsers,
      mutedCommunities: user.mutedCommunities,
      resetPasswordCodeExpiration: user.resetPasswordCodeExpiration,
      newFollowers: user.newFollowers,
      chatRequestEmail: user.chatRequestEmail,
      unsubscribeAllEmails: user.unsubscribeAllEmails,
      communityContentSort: user.communityContentSort,
      globalContentView: user.globalContentView,
      communityThemes: user.communityThemes,
      autoplayMedia: user.autoplayMedia,
      adultContent: user.adultContent,
      openPostsInNewTab: user.openPostsInNewTab,
      mentions: user.mentions,
      commentsOnYourPost: user.commentsOnYourPost,
      commentsYouFollow: user.commentsYouFollow,
      upvotesComments: user.upvotesComments,
      upvotesPosts: user.upvotesPosts,
      newFollowerEmail: user.newFollowerEmail,
      replies: user.replies,
      invitations: user.invitations,
      posts: user.posts,
      displayName: user.displayName,
      about: user.about,
      approvedUsers: user.approvedUsers,
      sendYouFriendRequests: user.sendYouFriendRequests,
      sendYouPrivateMessages: user.sendYouPrivateMessages,
      markAllChatsAsRead: user.markAllChatsAsRead,
    };
    if (authorizedUserName != null) {
      const authorizedUser = await User.findOne({
        username: authorizedUserName,
      });
      if (authorizedUser && authorizedUser.followings.includes(user._id)) {
        userObj.is_followed = true;
      } else {
        userObj.is_followed = false;
      }
    }
    return userObj;
  } catch (err) {
    return null;
  }
};


UserSchema.statics.getUserByResetToken = async function (token) {
  const user = await this.findOne({ resetToken: token });

  if (user) {
    return new User(user);
  } else {
    return null;
  }
};

UserSchema.methods.generateResetToken = async function () {
  try {
    user = this;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();
    return resetToken;
  } catch (error) {
    throw new Error('Failed to generate reset token');
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
