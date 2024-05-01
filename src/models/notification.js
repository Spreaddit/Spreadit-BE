const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const admin = require("firebase-admin");
const NotificationSub = require("./notificationSub");
//const notificationTypeId = require("./../../seed-data/constants/notificationType");
require("./user");
require("./post");
require("./comment");
//require("./constants/notificationType");

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
        // Here you can generate the postObject if needed
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
        is_hidden: notification.isHidden,
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
    if (!subs || subs.length === 0) {
        return null;
    }
    console.log(subs);
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
            return error; // Return the error to indicate failure
        }
    }
    return true; // Return true to indicate success
};


const Notification = mongoose.model("notification", NotificationSchema);

module.exports = Notification;
