const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
        location: {
          type: String,
          trim: true,
          maxLength: 30,
          default: "",
        },
        bio: {
            type: String,
            trim: true,
            maxLength: 160,
            default: "",
        },
        followers: [{ type: Schema.Types.ObjectId, ref: "user", index: true }],
        followings: [{ type: Schema.Types.ObjectId, ref: "user", index: true }],
        avatar: {
          type: String,
          trim: true,
          default: "",
        },
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
        isnsfw: {
          type: Boolean,
          default: false,
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
        
        //what banner is??

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
    $or: [{email: usernameOremail}, {username: usernameOremail}],
  });

  if(user[0]){
    return new User(user[0]);
  }
  else{
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
  const user = await User.findOne({email});
  if(user){
    return true;
  }
  else{
    return false;
  }
} 

UserSchema.statics.verifyCredentials = async function (usernameOremail, password){
  const user = await User.findOne({
    $or: [{email: usernameOremail}, {username: usernameOremail}],
  }).populate("roleId");

  if(user && (await bcrypt.compare(user.password, password)) && user.isVerified ){
    return user;
  }
  else {
    return null;
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


const User = mongoose.model("user", UserSchema);

module.exports = User;