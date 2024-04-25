const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const Post = require("./../models/post");
const Comment = require("./../models/comment");
const auth = require("../middleware/authentication");
const Notification = require("./../models/notification");
const NotificationType = require("./../../seed-data/constants/notificationType");
const NotificationSubscription = require("../models/notificationSub");
const webPush = require("web-push");
const upload = require("../service/fileUpload");
const { uploadMedia } = require("../service/cloudinary");
const config = require("./../configuration");
require("./../models/constants/notificationType");

router.post('/test-notification', async (req, res) => {
  try {
    const { userId, title, body, key } = req.body;
    console.log('Received request:', req.body);

    const userSub = new NotificationSubscription({
      userId: userId,
      fcmToken: key,
    });
    const saved = await userSub.save();
    console.log('Saved notification subscription:', saved);

    if (!saved) {
      return res.status(500).json({ error: 'Failed to save notification subscription' });
    }

    const result = await Notification.sendNotification(userId, title, body);
    console.log('Notification send result:', result);

    if (!result) {
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    res.status(200).json({ message: 'Notification sent successfully', result });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//n put it with el login?? check with cross and front
router.post("/notifications/subscribe", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const key = req.body.fcm;

    const subscription = await NotificationSubscription({fcmToken: key})

    const userSub = new NotificationSubscription({
      userId: userId,
      fcmToken: key,
    });
    console.log(userSub);
    const saved = await userSub.save();
    if (saved) {
      return res
        .status(200)
        .send({ message: "Subscription added successfully" });
    } else {
      return res
        .status(500)
        .send({ message: "Subscription could not be added" });
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
});


router.get(
  "/notifications",

  auth,
  async (req, res) => {
    try {
      const user = req.user;
      const result = await Notification.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .populate({
          path: "relatedUserId",
        })
        .populate({
          path: "notificationTypeId",
        })
        .populate({
          path: "commentId",
        })
        .populate({
          path: "postId",
        })
        .populate({
          path: "userId",
        });

      if (!result) {
        res.status(404).send({ error_message: "Notifications not found" });
      }

      const notifications = [];
      for (let i = 0; i < result.length; i++) {
        const notificationObject = await Notification.getNotificationObject(
          result[i]
        );
        notifications.push(notificationObject);
      }
      res.status(200).send({ notifications: notifications });
    } catch (err) {
      res.status(500).send(err.toString());
    }
  }
);

router.put("/read-notification", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const notificationId = req.body.notificationId;
    const notification = await Notification.findOne({
      _id: notificationId,
      userId: userId,
    });
    if (!notification) {
      return res.status(404).send({ message: "Notifiction is not found" });
    }
    const notificationRead = await Notification.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    const notificationObject = await Notification.getNotificationObject(
      notificationRead
    );
    res.status(200).send({
      message: "Notification has been read successfully",
      notification: notificationObject,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});


module.exports = router;