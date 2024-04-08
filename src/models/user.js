/**
 * Module dependencies.
 */
const Post = require('../models/post');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../configuration");
require("./constants/userRole");

const Schema = mongoose.Schema;
const userRole = require("../../seed-data/constants/userRole");

/**
 * @typedef {import('../../seed-data/constants/userRole').UserRole} UserRole
 */
/**
 * @typedef {string} UserRole - Placeholder for user role, which can be one of 'admin', 'user', etc.
 */

/**
 * @typedef {Object} UserObject
 * @property {string} name
 * @property {string} username
 * @property {string} email
 * @property {string} googleId
 * @property {string} password
 * @property {Date} birth_date
 * @property {string} gender
 * @property {string} phone_number
 * @property {string} country
 * @property {string[]} connectedAccounts
 * @property {string[]} approvedUsers
 * @property {string} bio
 * @property {Schema.Types.ObjectId[]} followers
 * @property {Schema.Types.ObjectId[]} followings
 * @property {Object[]} reportedUsers
 * @property {string} background_picture
 * @property {Schema.Types.ObjectId} roleId
 * @property {string} resetToken
 * @property {Date} resetTokenExpiration
 * @property {boolean} isVerified
 * @property {boolean} newFollowers
 * @property {boolean} chatRequestEmail
 * @property {boolean} unsubscribeAllEmails
 * @property {string} communityContentSort
 * @property {string} globalContentView
 * @property {boolean} communityThemes
 * @property {boolean} autoplayMedia
 * @property {boolean} adultContent
 * @property {boolean} openPostsInNewTab
 * @property {boolean} mentions
 * @property {boolean} comments
 * @property {boolean} upvotesComments
 * @property {boolean} upvotesPosts
 * @property {boolean} newFollowerEmail
 * @property {boolean} replies
 * @property {boolean} invitations
 * @property {boolean} posts
 * @property {boolean} inboxMessages
 * @property {boolean} chatMessages
 * @property {boolean} chatRequests
 * @property {boolean} repliesToComments
 * @property {boolean} cakeDay
 * @property {boolean} modNotifications
 * @property {string} displayName
 * @property {string} about
 * @property {string} avatar
 * @property {string} banner
 * @property {boolean} nsfw
 * @property {boolean} activeInCommunityVisibility
 * @property {boolean} clearHistory
 * @property {string} sendYouFriendRequests
 * @property {string} sendYouPrivateMessages
 * @property {boolean} markAllChatsAsRead
 * @property {boolean} allowFollow
 * @property {string[]} communities
 * @property {Schema.Types.ObjectId[]} savedPosts
 * @property {Schema.Types.ObjectId[]} savedComments
 * @property {Schema.Types.ObjectId[]} hiddenComments
 * @property {Schema.Types.ObjectId[]} hiddenPosts
 * @property {string[]} blockedUsers
 * @property {string[]} mutedCommunities
 * @property {Schema.Types.ObjectId[]} subscribedCommunities
 * @property {Object[]} tokens
 */


/**
 * User Schema definition.
 * @type {mongoose.Schema<object>}
 * @param {(mongoose.Document<object> | { roleId: UserRole })} user - User object.
 */
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
    googleId: {
      type: String,
      required: false,
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
      default: Date.now,
    },
    isVerified: {
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
    communities: {
      type: [String],
      default: function () {
        return [this.username];
      },
    },
    savedPosts: [{ 
      type: Schema.Types.ObjectId, ref: "Posts", index: true 
    }],
    savedComments: [{
       type: Schema.Types.ObjectId, ref: "comment", index: true 
    }],
    hiddenComments: [{
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }],
    hiddenPosts: [{
      type: Schema.Types.ObjectId,
      ref: 'post'
    }],
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
    subscribedCommunities: [
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
  },
  {
    timestamps: true,
  }
);

/**
 * Middleware: Hashes user's password before saving.
 * @param {Function} next
 */

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }

  next();
});

/**
 * Static method: Retrieves a user by email or username.
 * @param {string} usernameOremail - Username or email of the user.
 * @returns {Promise<MongooseDocument|null>} User object if found, otherwise null.
 */

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
/**
 * Instance method: Generates a token for the user.
 * @returns {Promise<string>} Generated token.
 */

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

/**
 * Instance method: Generates a token based on user's email.
 * @returns {Promise<string>} Generated token.
 */

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

/**
 * Static method: Checks if a user with given email exists.
 * @param {string} email - Email to check.
 * @returns {Promise<boolean>} True if user exists, otherwise false.
 */
UserSchema.statics.checkExistence = async function (email) {
  const user = await User.findOne({ email });
  if (user) {
    return true;
  } else {
    return false;
  }
};

/**
 * Static method: Verifies user's credentials.
 * @param {string} usernameOremail - Username or email of the user.
 * @param {string} password - User's password.
 * @returns {Promise<User|null>} User object if credentials are valid, otherwise null.
 */
UserSchema.statics.verifyCredentials = async function (
  usernameOremail,
  password
) {
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
/**
 * Static method: Generates a user object for response.
 * @param {(mongoose.Document<object> | { roleId: import('../../seed-data/constants/userRole').UserRole })} user - User object.
 * @param {string|null} authorizedUserName - Authorized user's username.
 * @returns {Promise<Object>} User object for response.
 */
UserSchema.statics.generateUserObject = async function (
  user
) {
  try {

    console.log(user);
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
      displayName: user.displayName,
      about: user.about,
      cakeDay: user.cakeDay,
    };

    console.log("USER OBJECT INSIDE");
    console.log(userObj);
    
    return userObj;
  } catch (err) {
    return null;
  }
};

/**
 * Static method: Retrieves a user by reset token.
 * @param {string} token - Reset token.
 * @returns {Promise<User|null>} User object if found, otherwise null.
 */

UserSchema.statics.getUserByResetToken = async function (token) {
  const user = await this.findOne({ resetToken: token });

  if (user) {
    return new User(user);
  } else {
    return null;
  }
};

/**
 * Instance method: Generates a reset token for the user.
 * @returns {Promise<string>} Generated reset token.
 */
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
/**
 * Instance method: Generates a random username.
 * @returns {Promise<string>} Generated random username.
 */
UserSchema.methods.generateRandomUsername = async function () {
  const randomUsername = this.generateRandomString();

  let user = await this.constructor.findOne({ username: randomUsername });
  if (user) {
    return this.generateRandomUsername();
  }

  return randomUsername;
};
/**
 * Instance method: Generates a random string.
 * @returns {string} Generated random string.
 */
UserSchema.methods.generateRandomString = function () {
  const length = 8; // Length of the random string
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789"; // Characters to choose from
  let randomString = "";

  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return randomString;
};

/**
 * User Model.
 * @type {mongoose.Model<UserObject>}
 */
const User = mongoose.model("user", UserSchema);

module.exports = User;
