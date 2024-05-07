const BanUser = require("../models/banUser");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const UserRole = require("../models/constants/userRole");
const Notification = require("../models/notification");
const Report = require("../models/report");
const mongoose = require("mongoose");
const NotificationType = require("./../../seed-data/constants/notificationType");

exports.adminBan = async (req, res) => {
  try {
    const adminId = await UserRole.find({
      name: "Admin",
    }).select("_id");
    const userToBeBanned = await User.getUserByEmailOrUsername(
      req.body.username
    );
    if (!userToBeBanned) {
      return res.status(404).send({ message: "User is not found" });
    }
    let previousBan = [];
    previousBan = await BanUser.find({ userId: userToBeBanned._id });
    if (adminId[0]._id.equals(req.user.roleId) && previousBan.length === 0) {
      const user = await User.findById(userToBeBanned._id);
      if (!user) {
        return res.status(404).send({ message: "User is not found" });
      }
      user.isBanned = true;
      user.save();
      const banuser = new BanUser();
      banuser.userId = userToBeBanned._id;
      banuser.reason = req.body.reason;
      if (req.body.isPermanent === true) {
        banuser.isPermanent = true;
      } else {
        if (!req.body.banDuration) {
          return res
            .status(400)
            .send({ message: "banDuration is required for temporary bans" });
        }
        banuser.isPermanent = false;
        banuser.banDuration = req.body.banDuration;
      }

      banuser.save();
      const message = req.body.isPermanent
        ? `This account has been banned permanently from posting. \n Reason: ${req.body.reason}`
        : `This account has been banned from posting until ${new Date(
            req.body.banDuration
          ).toDateString()}.\n Reason: ${req.body.reason}`;

      await Notification.sendNotification(
        userToBeBanned._id,
        "You have recieved a new notification",
        message
      );

      const notification = new Notification({
        userId: userToBeBanned._id,
        content: message,
        notificationTypeId: NotificationType.accountUpdate._id,
        relatedUserId: req.user._id,
      });
      await notification.save();

      const userObj = await User.generateUserObject(user);
      res.status(200).send({
        user: userObj,
        message: "User Banned successfully",
      });
    } else if (previousBan !== 0 && userToBeBanned.isBanned === true) {
      return res.status(402).send({ message: "the user is already banned" });
    } else return res.status(401).send({ message: "You are not authorized" });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.adminUnban = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "isBanned", "accessToken"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const adminId = await UserRole.find({
      name: "Admin",
    }).select("_id");
    const userToBeUnbanned = await User.getUserByEmailOrUsername(
      req.body.username
    );
    if (adminId[0]._id.equals(req.user.roleId)) {
      if (!userToBeUnbanned) {
        return res.status(404).send({ message: "User is not found" });
      }
      const user = await User.findByIdAndUpdate(
        userToBeUnbanned._id,
        { isBanned: false },
        { new: true, runValidators: true }
      );
      const isBanned = await BanUser.findOne({ userId: userToBeUnbanned._id });
      if (!isBanned) {
        return res.status(404).send({ message: "User is not banned" });
      }
      const banuser = await BanUser.deleteOne({ userId: userToBeUnbanned._id });
      const userObj = await User.generateUserObject(user);
      res.status(200).send({
        user: userObj,
        message: "User was unbanned successfully",
      });
    } else return res.status(401).send({ message: "You are not authorized" });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.adminSearchUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["location", "gender", "accessToken", "count", "page"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid filters!" });
  }
  let user = null;
  let userCount = null;
  const count = req.body.count || 20;
  const page = req.body.page || 1;
  try {
    if (req.body.location && req.body.gender) {
      let gender = req.body.gender;
      let location = req.body.location;
      user = await User.find({
        location: location,
        gender: gender,
      })
        .sort({ createdAt: -1 })
        .skip(count * (page - 1))
        .limit(count);
    } else if (req.body.location) {
      let location = req.body.location;
      user = await User.find({
        location: location,
      })
        .sort({ createdAt: -1 })
        .skip(count * (page - 1))
        .limit(count);
    } else if (req.body.gender) {
      let gender = req.body.gender;
      user = await User.find({
        gender: gender,
      })
        .sort({ createdAt: -1 })
        .skip(count * (page - 1))
        .limit(count);
    } else {
      user = await User.find({})
        .sort({ createdAt: -1 })
        .skip(count * (page - 1))
        .limit(count);
    }

    if (req.body.location && req.body.gender) {
      let gender = req.body.gender;
      let location = req.body.location;
      userCount = await User.count({
        location: location,
        gender: gender,
      });
    } else if (req.body.location) {
      let location = req.body.location;
      userCount = await User.count({
        location: location,
      });
    } else if (req.body.gender) {
      let gender = req.body.gender;
      userCount = await User.count({
        gender: gender,
      });
    } else {
      userCount = await User.count({});
    }

    res.status(200).send({
      user: user,
      count: userCount,
      message: "Users have been retrived successfully",
    });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.adminGetReportedComments = async (req, res) => {
  try {
    const adminId = await UserRole.find({
      name: "Admin",
    }).select("_id");
    const reportedComments = [];
    if (adminId[0]._id.equals(req.user.roleId)) {
      const comments = await Comment.find({ isRemoved: false }).populate(
        "userId"
      );
      for (const comment of comments) {
        const reports = await Report.find({ commentId: comment._id }).populate(
          "userId"
        );
        if (reports.length > 0) {
          const commentObject = await Comment.getCommentObject(
            comment,
            req.user._id,
            true
          );
          const reportsArray = reports.map((report) => ({
            username: report.userId.username,
            reason: report.reason,
            subreason: report.subreason,
          }));
          commentObject.reports = reportsArray;
          reportedComments.push(commentObject);
        }
      }
      res.status(200).send({
        reportedComments: reportedComments,
        message: "Comments have been retrived successfully",
      });
    } else return res.status(403).send({ message: "You are not authorized" });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.adminGetReportedPosts = async (req, res) => {
  try {
    const adminId = await UserRole.find({
      name: "Admin",
    }).select("_id");
    const reportedPosts = [];
    if (adminId[0]._id.equals(req.user.roleId)) {
      const posts = await Post.find();
      for (const post of posts) {
        const reports = await Report.find({ postId: post._id }).populate(
          "userId"
        );
        if (reports.length > 0) {
          const postObject = await Post.getPostObject(post, req.user._id);
          const reportsArray = reports.map((report) => ({
            username: report.userId.username,
            reason: report.reason,
            subreason: report.subreason,
          }));
          postObject.reports = reportsArray;
          reportedPosts.push(postObject);
        }
      }
      res.status(200).send({
        reportedPosts: reportedPosts,
        message: "Posts have been retrived successfully",
      });
    } else return res.status(403).send({ message: "You are not authorized" });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};
