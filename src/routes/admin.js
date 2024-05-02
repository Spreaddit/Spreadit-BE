const express = require("express");
const BanUser = require("../models/banUser");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const UserRole = require("../models/constants/userRole");
const auth = require("../middleware/authentication");
const router = express.Router();
const Notification = require("../models/notification");
const Report = require("../models/report");
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
      if (!userToBeBanned) {
        return res.status(404).send({ message: "User is not found" });
      }
      if (adminId[0]._id.equals(req.user.roleId)) {
        const user = await User.findByIdAndUpdate(
          userToBeBanned._id,
          { isBanned: true },
          { new: true, runValidators: true }
        );
        userToBeBanned.save();
        if (!user) {
          return res.status(404).send({ message: "User is not found" });
        }
        const banuser = new BanUser();
        banuser.userId = userToBeBanned._id;
        banuser.reason = req.body.reason;
        if (req.body.isPermanent === true) {
          banuser.isPermanent = true;
        } else {
          if (!req.body.banDuration) {
              return res.status(400).send({ message: "banDuration is required for temporary bans" });
          }
          banuser.isPermanent = false;
          banuser.banDuration = req.body.banDuration;
        }
        
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
          relatedUserId: req.user._id,
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
        const userObj = await User.generateUserObject(user);
        res.status(200).send({
          user: userObj,
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
    const reportedPosts = [];
    if (adminId[0]._id.equals(req.user.roleId)) {
      console.log(req.user.roleId);
      console.log(adminId[0]._id);
      const posts = await Post.find();
      //console.log(posts);
      for (const post of posts) {
        const reports = await Report.find({ postId: post._id }).populate('userId');
        if (reports.length > 0) {
          const postObject = await Post.getPostObject(post, req.user._id);
          const reportsArray = reports.map(report => ({
            username: report.userId.username,
            reason: report.reason,
            subreason: report.subreason
          }));     
          postObject.reports = reportsArray;
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

/*
router.get("/dashboard/posts", auth.authentication, async (req, res) => {
  try{
    const adminId = await UserRole.find({
      name: "Admin",
    }).select("_id");
    let reportedPosts;
    if (adminId[0]._id.equals(req.user.roleId)) {
      reportedPosts = await Post.aggregate([
        {
          $lookup: {
            from: "reports",
            localField: "_id",
            foreignField: "postId",
            as: "reports"
          }
        },
        {
          $match: {
            reports: { $exists: true, $not: { $size: 0 } }
          }
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            username: 1,
            title: 1,
            content: 1,
            community: 1,
            reports: {
              $map: {
                input: "$reports",
                as: "report",
                in: {
                  username: "$$report.userId",
                  reason: "$$report.reason",
                  subreason: "$$report.subreason"
                }
              }
            }
          }
        }
      ]);
    }
    res.status(200).send({
      reportedPosts: reportedPosts,
      message: "Users have been retrived successfully",
    });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
  

});*/
router.get("/dashboard/comments", auth.authentication, async (req, res) => {
  try{
    const adminId = await UserRole.find({
      name: "Admin",
    }).select("_id");
    const reportedComments = [];
    if (adminId[0]._id.equals(req.user.roleId)) {
      console.log(req.user.roleId);
      console.log(adminId[0]._id);
      const comments = await Comment.find({ isRemoved: false }).populate('userId');
      for (const comment of comments) {
          const reports = await Report.find({ commentId: comment._id}).populate('userId');
          //console.log(reports);
          if (reports.length > 0) {
            const commentObject = await Comment.getCommentObject(comment, req.user._id, true);
            const reportsArray = reports.map(report => ({
              username: report.userId.username,
              reason: report.reason,
              subreason: report.subreason
            }));
            commentObject.reports = reportsArray;
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