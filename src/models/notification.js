const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const webPush = require("web-push");
const NotificationSub = require("./notificationSub");

require("./user");
require("./post");
require("./comment");

const NotificationSchema = new Schema(
  {
    userId: { //the who will recieve the notification
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "user",
    },
    postId: {
      type: Schema.Types.ObjectId,
      index: true,
      ref: "post",
      default: null,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      index: true,
      ref: "comment",
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
    relatedUserId: { //the one who will send the notification
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
    user = null,
    comment = null;

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

  if (notification.commentId != null) {
    const Comment = mongoose.model("comment");
    comment = await Comment.getCommentObject(
      notification.commentId,
      notification.userId._id,
      false
    );
  }

  const notificationObject = {
    _id: notification._id,
    content: notification.content,
    notification_type: notification.notificationTypeId.name,
    related_user: user,
    post: post,
    comment: comment,
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
