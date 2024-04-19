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
    banDuration: {
      type: Date,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

const BanUser = mongoose.model("banUser", BanUserSchema);

module.exports = BanUser;
