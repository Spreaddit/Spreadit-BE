const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./user");
require("./post");

const NotificationSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: "user",
    },
    tweetId: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: "post",
        default: null,
    },
    content: {
        type: String,
        trim: true,
        default: "",
    },
    notificationTypeId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: "notificationType",
    },
    associatedUserId: { //for mentions and replies
        type: Schema.Types.ObjectId,
        index: true,
        ref: "user",
        default: null,
    },
    isHidden: {
        type: Boolean,
        default: false,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("notification", NotificationSchema);

module.exports = Notification;