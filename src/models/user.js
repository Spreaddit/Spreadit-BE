const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../configuration");
require("./constants/userRole");
const sendEmail = require('./send-email');

const Schema = mongoose.Schema;
const userRole = require("../../seed-data/constants/userRole");


const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 50,
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
    connectedAccounts: [{
      type: String,
    }],
    bio: {
      type: String,
      trim: true,
      maxLength: 160,
      default: "",
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "user", index: true }],
    followings: [{ type: Schema.Types.ObjectId, ref: "user", index: true }],
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
    verificationCode: {
      type: Number,
      default: -1,
    },
    verificationCodeExpiration: {
      type: Date,
      default: new Date(new Date().setHours(new Date().getHours() + 24)),
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
      enum: ['Hot', 'New', 'Top', 'Rising'],
      default: 'Hot',
    },
    globalContentView: {
      type: String,
      enum: ['Card', 'Classic', 'Compact'],
      default: 'Card',
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
    }, displayName: {
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
    contentVisibility: {
      type: Boolean,
      default: true,
    },
    allowFollow: {
      type: Boolean,
      default: true,
    },
    blockedUsers: [{
      type: String,
    }],
    mutedCommunities: [{
      type: String,
    }],
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
  }
  else {
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
  )
  return token;

};

UserSchema.statics.checkExistence = async function (email) {
  const user = await User.findOne({ email });
  if (user) {
    return true;
  }
  else {
    return false;
  }
}

UserSchema.statics.verifyCredentials = async function (usernameOremail, password) {
  const user = await User.findOne({
    $or: [{ email: usernameOremail }, { username: usernameOremail }],
  }).populate("roleId");
  UserSchema.statics.verifyCredentials = async function (usernameOremail, password) {


    // const user = await User.findOne({
    //   $or: [{email: usernameOremail}, {username: usernameOremail}],
    // }).populate("roleId");

    const userByEmail = await User.findOne({ email: usernameOremail }).populate("roleId");
    const userByUsername = await User.findOne({ username: usernameOremail }).populate("roleId");
    //console.log(usernameOremail);
    //console.log(userByEmail);
    //console.log(userByUsername);
    const user = userByUsername;
    if (userByEmail) {
      user = userByEmail;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    else {
      return null;
    }
  }
}

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
      isnsfw: user.isnsfw,
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

UserSchema.methods.generateResetCode = async function () {
  user = this;
  // Generate a random reset password code (6 Digit number)
  const tempVerificationCode = Math.floor(100000 + Math.random() * 900000);

  // Set the expiration date for the reset password code (1 Hour from now)
  const tempVerificationCodeExpiration = new Date();
  tempVerificationCodeExpiration.setHours(tempVerificationCodeExpiration.getHours() + 1);

  // Set the generated code and its expiration date for the user
  user.verificationCode = tempVerificationCode;
  user.verificationCodeExpiration = tempVerificationCodeExpiration;

  // Save the user with the new verification code and expiration date
  await user.save();

  // Send the verification code to the user's email
  const emailContent = `Your verification code is: ${tempVerificationCode}`;
  await sendEmail(user.email, 'Verification Code', emailContent);

};


const User = mongoose.model("user", UserSchema);

module.exports = User;
