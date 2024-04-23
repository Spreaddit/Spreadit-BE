const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationsSubSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "user",
    },
    fcmToken: {
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
