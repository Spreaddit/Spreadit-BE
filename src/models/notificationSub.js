const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./user");

const NotificationsSubSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "user",
    },
    subscription: {
      type: Object,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NotificationsSubModel = mongoose.model(
  "notificationsSub",
  NotificationsSubSchema
);

module.exports = NotificationsSubModel;
