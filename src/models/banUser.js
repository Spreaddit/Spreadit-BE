const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BanUserSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "user",
    },
    userWhoBan: {
      type: String,
      index: true,
    },
    banDuration: {
      type: Date,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    isPermanent: {
      type: Boolean,
      default: false,
    },
    communityName: {
      type: String,
      trim: true,
    },
    banMessage: {
      type: String,
      trim: true,
    },
    modNote: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const BanUser = mongoose.model("banUser", BanUserSchema);

module.exports = BanUser;
