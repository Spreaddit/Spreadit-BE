const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const webPush = require("web-push");
const NotificationSub = require("./notificationsSub");

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
    postId: {
      type: Schema.Types.ObjectId,
      index: true,
      ref: "tweet",
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
    relatedUserId: {
      type: Schema.Types.ObjectId,
      index: true,
      ref: "user",
      default: null,
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

NotificationSchema.statics.getNotificationObject = async function (
  notification
) {
  let post = null,
    user = null;

  if (notification.postId != null) {
    const Post = mongoose.model("post");
    //here I need to generate postObject
  }
  if (notification.relatedUserId != null) {
    const User = mongoose.model("user");
    user = await User.generateUserObject(
      notification.relatedUserId,
      notification.userId.username
    );
  }

  const notificationObject = {
    _id: notification._id,
    content: notification.content,
    notification_type: notification.notificationTypeId.name,
    related_user: user,
    tweet: tweet,
    is_read: notification.isRead,
    created_at: notification.createdAt,
  };
  return notificationObject;
};

NotificationSchema.statics.sendNotification = async function (
  userId,
  title,
  body
) {
  const subs = await NotificationSub.find({ userId: userId });
  if (!subs) {
    return null;
  }
  const payload = {
    title: title,
    body: body,
  };
  for (let i = 0; i < subs.length; i++) {
    const options = {
      vapidDetails: {
        subject: "mailto:spreaditnoreplyservices@gmail.com",
        publicKey: subs[i].publicKey,
        privateKey: subs[i].privateKey,
      },
    };

    webPush.sendNotification(
      subs[i].subscription,
      JSON.stringify(payload),
      options
    );
  }
};

const Notification = mongoose.model("notification", NotificationSchema);

module.exports = Notification;
