const mongoose = require("mongoose");
const config = require("../config");
const generator = require("generate-password");
const genUsername = require("unique-username-generator");
require("./constants/userRole");

const Schema = mongoose.Schema;
const userRole = require("../../seed-data/constants/users");


const UserSchema = new Schema(
    {
        name: {
          type: String,
          required: true,
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
        website: {
          type: String,
          trim: true,
          maxLength: 100,
          default: "",
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
        isVerified: {
          type: Boolean,
          default: false,
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
        //what banner is??

    },
    {
        timestamps: true,
    }
);


const User = mongoose.model("user", UserSchema);

module.exports = User;