const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const admin = require("firebase-admin");
const NotificationSub = require("./notificationSub");
require("./user");
require("./post");
require("./comment");

const serviceAccount = require("./../../spreadit-b8b53-firebase-adminsdk-3ka4j-3ba29720af.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
    isHidden: {
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
    post = {
      title: notification.postId.title,
      community: notification.postId.community,
    };
  }
  if (notification.relatedUserId != null) {
    user = {
      username: notification.relatedUserId.username,
      avatar: notification.relatedUserId.avatar,
    };
  }
  let rootComment;
  if (notification.commentId != null) {
    const Comment = mongoose.model("comment");
    rootComment = await Comment.findRootComment(notification.commentId);
    comment = {
      content: rootComment ? rootComment.content : null,
      postTitle:
        rootComment && rootComment.postId ? rootComment.postId.title : null,
      communityTitle:
        rootComment && rootComment.postId ? rootComment.postId.community : null,
    };
  }

  const notificationObject = {
    _id: notification._id,
    userId: notification.userId ? notification.userId._id : null,
    postId: notification.postId ? notification.postId._id : null,
    commentId: rootComment
      ? notification.commentId
        ? notification.commentId._id
        : null
      : null,
    content: notification.content,
    notification_type: notification.notificationTypeId.name,
    related_user: user,
    post: post,
    comment: comment,
    is_read: notification.isRead,
    is_hidden: notification.isHidden,
    created_at: notification.createdAt,
  };
  if (notification.notificationTypeId.name === "Account Update") {
    delete notificationObject.related_user;
  }

  return notificationObject;
};

NotificationSchema.statics.sendNotification = async function (
  userId,
  title,
  body
) {
  const subs = await NotificationSub.find({ userId: userId });
  if (!subs || subs.length === 0) {
    return null;
  }
  const payload = {
    notification: {
      title: title,
      body: body,
    },
  };

  for (let i = 0; i < subs.length; i++) {
    try {
      await admin.messaging().sendToDevice(subs[i].fcmToken, payload);
      console.log("Notification sent to:", subs[i].fcmToken);
    } catch (error) {
      console.error("Error sending FCM message:", error);
      return error;
    }
  }
  return true;
};

const Notification = mongoose.model("notification", NotificationSchema);

module.exports = Notification;
