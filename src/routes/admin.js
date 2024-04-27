const express = require("express");
const banUser = require("../models/banUser");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const UserRole = require("../models/constants/userRole");
const auth = require("../middleware/authentication");
const router = express.Router();
const Notification = require("../models/notification");
const mongoose = require("mongoose");
const NotificationType = require("./../../seed-data/constants/notificationType");


router.post("/dashboard/ban", auth.authentication, async (req, res) => {
    const banuser = new banUser(req.body);
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "username",
      "isBanned",
      "banDuration",
      "reason",
      "isPermanent",
      "accessToken",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ message: "Invalid updates!" });
    }
    try {
      const adminId = await UserRole.find({
        name: "Admin",
      }).select("_id");
      const userToBeBanned = await User.getUserByEmailOrUsername(req.body.username);
      if (adminId[0]._id.equals(req.user.roleId)) {
        const user = await User.findByIdAndUpdate(
          userToBeBanned._id,
          { isBanned: true },
          { new: true, runValidators: true }
        );
  
        if (!user) {
          return res.status(404).send({ message: "User is not found" });
        }
        banuser.userId = userToBeBanned._id;
        banuser.save();
        const message = req.body.isPermanent
          ? `This account has been banned permanently from posting. \n Reason: ${req.body.reason}`
          : `This account has been banned from posting until ${new Date(req.body.banDuration).toDateString()}.\n Reason: ${req.body.reason}`;
  
        await Notification.sendNotification(
          userToBeBanned._id,
          "You have recieved a new notification",
          message
        );
  
        const notification = new Notification({
          userId: userToBeBanned._id,
          content: message,
          notificationTypeId: NotificationType.accountUpdate._id,
        });
        await notification.save();
  
        const userObj = await User.generateUserObject(user);
        res.status(200).send({
          user: userObj,
          message: "User Banned successfully",
        });
      } else return res.status(401).send({ message: "You are not authorized" });
    } catch (e) {
      res.status(500).send({ message: "Internal server error" });
    }
});
router.post("/dashboard/unban", auth.authentication, async (req, res) => {
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
      const userToBeUnbanned = await User.getUserByEmailOrUsername(req.body.username);
      if (adminId[0]._id.equals(req.user.roleId)) {
        const user = await User.findByIdAndUpdate(
          userToBeUnbanned._id,
          { isBanned: false },
          { new: true, runValidators: true }
        );
        const banuser = await banUser.deleteOne({ userId: userToBeUnbanned._id });
  
        if (!user) {
          return res.status(404).send({ message: "User is not found" });
        }
  
        if (!banuser) {
          return res.status(404).send({ message: "User is not banned" });
        }
  
        res.status(200).send({
          user: user,
          message: "User was unbanned successfully",
        });
      } else return res.status(401).send({ message: "You are not authorized" });
    } catch (e) {
      res.status(500).send({ message: "Internal server error" });
    }
});

router.post("/dashboard/users", auth.authentication, async (req, res) => {
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
});


router.get("/dashboard/posts", auth.authentication, async (req, res) => {
  try{
    const adminId = await UserRole.find({
      name: "Admin",
    }).select("_id");
    if (adminId[0]._id.equals(req.user.roleId)) {

      const reportedPosts = [];
      const posts = await Post.find();
      for (const post of posts) {
          const report = await Report.findOne({ postId: post._id, reason: reportedReason });
          if (report) {
              const postObject = await Post.getPostObject(post);
              postObject.reason = report.reason;
              postObject.subreason = report.subreason;
              reportedPosts.push(postObject);
          }
      }
  
    }
    res.status(200).send({
      reportedPosts: reportedPosts,
      message: "Users have been retrived successfully",
    });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
  

});
router.get("/dashboard/comments", auth.authentication, async (req, res) => {
  try{
    const adminId = await UserRole.find({
      name: "Admin",
    }).select("_id");
    if (adminId[0]._id.equals(req.user.roleId)) {

      const reportedComments = [];
      const comments = await Comment.find({ isRemoved: false }).populate('userId');
      for (const comment of comments) {
          const report = await Report.findOne({ commentId: comment._id, reason: reportedReason });
          if (report) {
              const commentObject = await Comment.getCommentObject(comment);
              commentObject.reason = report.reason;
              commentObject.subreason = report.subreason;
              reportedComments.push(commentObject);
          }
      }
  
    }
    res.status(200).send({
      reportedComments: reportedComments,
      message: "Comments have been retrived successfully",
    });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
  

});


module.exports = router;