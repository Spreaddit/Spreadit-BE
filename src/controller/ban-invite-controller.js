const Community = require("../models/community");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Report = require("../models/report.js");
const Message = require("../models/message");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Conversation = require("../models/conversation");
const { message } = require("../../seed-data/constants/notificationType");
const BanUser = require("../models/banUser");
const User = require("../models/user");
const Moderator = require("../models/moderator");
const Notification = require("../models/notification");
const NotificationType = require("../../seed-data/constants/notificationType");

exports.banUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "username",
      "isBanned",
      "banDuration",
      "reason",
      "isPermanent",
      "accessToken",
      "communityName",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ message: "Invalid updates!" });
    }

    const userId = req.user._id;
    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName: req.body.communityName,
    });
    if (!moderator) {
      return res.status(404).send({ message: "Moderator not found" });
    }

    if (!moderator.manageUsers) {
      return res
        .status(403)
        .send({ message: "You are not allowed to manage users" });
    }

    const userToBeBanned = await User.getUserByEmailOrUsername(
      req.body.username
    );
    if (!userToBeBanned) {
      return res.status(404).send({ message: "User not found" });
    }

    const community = await Community.findOne({
      name: req.body.communityName,
      members: userToBeBanned._id,
    });
    if (!community) {
      return res
        .status(404)
        .send({ message: "User is not a member of the community" });
    }

    const banData = {
      userId: userToBeBanned._id,
      banDuration: req.body.banDuration,
      reason: req.body.reason,
      isPermanent: req.body.isPermanent,
      communityName: req.body.communityName,
      banMessage: req.body.banMessage,
      modNote: req.body.modNote,
    };
    const ban = new BanUser(banData);
    await ban.save();

    const message = req.body.isPermanent
      ? `You have been banned permanently from posting in ${req.body.communityName}. \n Reason: ${req.body.reason}`
      : `You have been banned from posting in ${
          req.body.communityName
        } until ${new Date(req.body.banDuration).toDateString()}.\n Reason: ${
          req.body.reason
        }`;
    await Notification.sendNotification(
      userToBeBanned._id,
      "You have received a new notification",
      message
    );
    const notification = new Notification({
      userId: userToBeBanned._id,
      content: message,
      notificationTypeId: NotificationType.accountUpdate._id,
    });
    await notification.save();

    const userObj = await User.generateUserObject(userToBeBanned);
    res.status(200).send({
      user: userObj,
      message: "User banned successfully",
    });
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.unbanUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "username",
      "isBanned",
      "accessToken",
      "communityName",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ message: "Invalid updates!" });
    }

    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName: req.body.communityName,
    });
    if (!moderator) {
      return res.status(404).send({ message: "Moderator not found" });
    }

    if (!moderator.manageUsers) {
      return res
        .status(403)
        .send({ message: "You are not allowed to manage users" });
    }

    const userToBeUnbanned = await User.getUserByEmailOrUsername(
      req.body.username
    );
    if (!userToBeUnbanned) {
      return res.status(404).send({ message: "User not found" });
    }

    const community = await Community.findOne({
      name: req.body.communityName,
      members: userToBeUnbanned._id,
    });
    if (!community) {
      return res
        .status(404)
        .send({ message: "User is not a member of the community" });
    }

    // Delete ban record
    const banuser = await BanUser.deleteOne({ userId: userToBeUnbanned._id });
    if (!banuser) {
      return res.status(404).send({ message: "User is not banned" });
    }

    // Send response
    const userObj = await User.generateUserObject(userToBeUnbanned);
    res.status(200).send({
      user: userObj,
      message: "User was unbanned successfully",
    });
  } catch (error) {
    console.error("Error unbanning user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.checkUserBanStatus = async (req, res) => {
  try {
    const { userId, communityName } = req.body;
    if (!userId || !communityName) {
      return res
        .status(400)
        .json({ message: "User ID and community name are required" });
    }
    const banRecord = await BanUser.findOne({
      userId,
      communityName,
    });

    if (banRecord) {
      return res.status(200).json({ banned: true });
    }

    return res.status(200).json({ banned: false });
  } catch (error) {
    console.error("Error checking user ban status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
