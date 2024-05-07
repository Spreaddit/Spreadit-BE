const Post = require("../models/post");
const Comment = require("../models/comment.js");
const User = require("../models/user");
const Report = require("../models/report.js");
const Community = require("../models/community.js");
const mongoose = require("mongoose");
const Notification = require("../models/notification");
const Message = require("../models/message.js");
const NotificationSubscription = require("../models/notificationSub.js");

exports.subscribe = async (req, res) => {
  try {
    const userId = req.user._id;
    const key = req.body.fcmToken;

    let subscription = [];
    subscription = await NotificationSubscription.find({ fcmToken: key });

    if (subscription.length === 0) {
      const userSub = new NotificationSubscription({
        userId: userId,
        fcmToken: key,
      });
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
    } else {
      return res.status(400).send({ message: "Subscription already there" });
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user._id },
      { $set: { isRead: true } }
    );
    await Message.updateMany(
      { recieverId: req.user._id },
      { $set: { isRead: true } }
    );
    res
      .status(200)
      .json({ message: "Notifications marked as read successfully" });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUnreadNotificationCount = async (req, res) => {
  try {
    const unreadNotificationCount = await Notification.countDocuments({
      userId: req.user._id,
      isRead: false,
      isHidden: false,
    });
    const unreadMessageCount = await Message.countDocuments({
      recieverId: req.user._id,
      isRead: false,
      isDeleted: false,
    });
    const unreadCount = unreadNotificationCount + unreadMessageCount;
    const responseObject = {
      unreadCount: unreadCount,
    };
    res.status(200).json(responseObject);
  } catch (error) {
    console.error("Error retrieving unread notification count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const notificationId = req.params.notificationId;
    const notification = await Notification.findOne({
      _id: notificationId,
      userId: userId,
    });
    if (!notification) {
      return res.status(404).send({ message: "Notification not found" });
    }
    const notificationRead = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true, runValidators: true }
    );
    res.status(200).send({
      message: "Notification has been marked as read successfully",
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const user = req.user;
    const result = await Notification.find({
      userId: user._id,
      isHidden: false,
    })
      .sort({ createdAt: -1 })
      .populate("relatedUserId")
      .populate("notificationTypeId")
      .populate("commentId")
      .populate("postId")
      .populate("userId");
    if (!result || result.length === 0) {
      return res.status(404).send({ error_message: "Notifications not found" });
    }
    const notifications = await Promise.all(
      result.map((notification) =>
        Notification.getNotificationObject(notification)
      )
    );
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    res.status(500).send({ error: error.toString() });
  }
};

exports.hideNotification = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { isHidden: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).send({ error: "Notification not found" });
    }

    res.status(200).send({ message: "Notification hidden successfully" });
  } catch (error) {
    console.error("Error hiding notification:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.suggestCommunity = async (req, res) => {
  try {
    const count = await Community.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomCommunity = await Community.findOne().skip(randomIndex);

    if (!randomCommunity) {
      return res.status(404).send({ error_message: "No community found" });
    }

    res.status(200).json({
      communityname: randomCommunity.name,
      communityProfilePic: randomCommunity.image,
    });
  } catch (error) {
    console.error("Error suggesting random community:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.disableCommunityUpdates = async (req, res) => {
  try {
    const userId = req.user._id;
    const communityname = req.params.communityname;
    const community = await Community.findOne({ name: communityname });
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    const communityId = community._id;
    const user = await User.findById(userId);
    if (user.disabledCommunities.includes(communityId)) {
      return res
        .status(400)
        .json({ error: "Community updates are already disabled for the user" });
    }
    await User.findByIdAndUpdate(userId, {
      $addToSet: { disabledCommunities: communityId },
    });
    res
      .status(200)
      .json({ message: "Updates disabled for the specified community" });
  } catch (error) {
    console.error("Error disabling updates for community:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
