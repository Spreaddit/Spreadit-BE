const Post = require("../models/post");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../configuration");
const Community = require("../models/community.js");
require("./constants/userRole");
const userRole = require("./../../seed-data/constants/userRole");

const Schema = mongoose.Schema;

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
      required: false,
      trim: true,
      unique: true,
    },
    googleId: {
      type: String,
      required: false,
      trim: true,
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
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: 0,
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
    comments: {
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
    inboxMessages: {
      type: Boolean,
      default: 1,
    },
    chatMessages: {
      type: Boolean,
      default: 1,
    },
    chatRequests: {
      type: Boolean,
      default: 1,
    },
    repliesToComments: {
      type: Boolean,
      default: 1,
    },
    cakeDay: {
      type: Boolean,
      default: 1,
    },
    modNotifications: {
      type: Boolean,
      default: 1,
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
      default: false,
    },
    allowFollow: {
      type: Boolean,
      default: true,
    },
    commentsOnYourPost: {
      type: Boolean,
      default: true,
    },
    commentsYouFollow: {
      type: Boolean,
      default: true,
    },
    upvotes: {
      type: Boolean,
      default: true,
    },
    selectedPollOption: {
      type: String,
    },
    communities: {
      type: [String],
      default: function () {
        return [this.username];
      },
    },
    savedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Posts",
        index: true,
      },
    ],
    savedComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
        index: true,
      },
    ],
    hiddenComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    hiddenPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    recentPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    blockedUsers: [
      {
        type: String,
      },
    ],
    mutedCommunities: [
      {
        type: Schema.Types.ObjectId,
        ref: Community,
      },
    ],
    subscribedCommunities: [
      {
        type: Schema.Types.ObjectId,
        ref: Community,
      },
    ],
    favouriteCommunities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Community",
      },
    ],
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
    socialLinks: [
      {
        platform: String,
        url: String,
        displayName: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

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

UserSchema.methods.generateEmailToken = async function () {
  user = this;

  const token = jwt.sign(
    {
      email: user.email,
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

UserSchema.statics.verifyCredentials = async function (usernameOremail, password) {
  const userByEmail = await User.findOne({
    email: usernameOremail,
  }).populate("roleId");
  const userByUsername = await User.findOne({
    username: usernameOremail,
  }).populate("roleId");

  let user = userByUsername;
  if (userByEmail) {
    user = userByEmail;
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  } else {
    return null;
  }
};

UserSchema.statics.generateUserObject = async function (user) {
  try {
    const userObj = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      googleId: user.googleId,
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
      isVerified: user.isVerified,
      isVisible: user.isVisible,
      isActive: user.isActive,
      displayName: user.displayName,
      about: user.about,
      cakeDay: user.cakeDay,
      subscribedCommunities: user.subscribedCommunities,
      favouriteCommunities: user.favouriteCommunities,
      socialLinks: user.socialLinks,
      //commentsOnYourPost commentsYouFollow upvotes selectedPollOption
      commentsOnYourPost: user.commentsOnYourPost,
      commentsYouFollow: user.commentsYouFollow,
      upvotes: user.upvotes,
      selectedPollOption: user.selectedPollOption,
    };

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
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();
    return resetToken;
  } catch (error) {
    throw new Error("Failed to generate reset token");
  }
};

UserSchema.methods.generateRandomUsername = async function () {
  const randomUsername = this.generateRandomString();

  let user = await this.constructor.findOne({ username: randomUsername });
  if (user) {
    return this.generateRandomUsername();
  }

  return randomUsername;
};

UserSchema.methods.generateRandomString = function () {
  const length = 8; // Length of the random string
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789"; // Characters to choose from
  let randomString = "";

  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return randomString;
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
