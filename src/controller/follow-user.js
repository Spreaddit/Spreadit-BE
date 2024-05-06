const User = require("../models/user");
const FollowUser = require("../models/user");
const Notification = require("./../models/notification");
const NotificationType = require("./../../seed-data/constants/notificationType");
require("./../models/constants/notificationType");
const jwt = require("jsonwebtoken");

exports.followUser = async (req, res) => {
  //const followerID = req.user;
  try {
    const username = req.body.username;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const user = await FollowUser.getUserByEmailOrUsername(username);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    const toFollowID = user._id; //notification to it
    const followerID = req.user._id;

    if (toFollowID.equals(followerID)) {
      console.log("user cannot follow himself");
      return res.status(400).json({ error: "user cannot follow himself" });
    }
    if (!toFollowID || !followerID) {
      console.error("this user not found:");
      return res.status(404).json({ error: "User not found" });
    }
    const followerUser = await FollowUser.findByIdAndUpdate(
      followerID, // User being followed
      { $addToSet: { followings: toFollowID } }, // Add follower's ID to the followers array, using $addToSet to ensure uniqueness
      { new: true } // To return the updated document after the update operation
    );

    const tofollowUser = await FollowUser.findByIdAndUpdate(
      toFollowID, // User being followed
      { $addToSet: { followers: followerID } }, // Add follower's ID to the followers array, using $addToSet to ensure uniqueness
      { new: true } // To return the updated document after the update operation
    );

    if (!followerUser) {
      return res.status(404).json({ error: "user not found" });
    }
    const response = {
      description: "User followed successfully",
    };
    if (user.newFollowers) {
      await Notification.sendNotification(
        toFollowID.userId,
        "You have recieved a new notification",
        `${req.user.username} follow you `
      );
      const notification = new Notification({
        userId: toFollowID,
        content: `${req.user.username} follow you`,
        relatedUserId: req.user._id,
        notificationTypeId: NotificationType.follow._id,
      });
      await notification.save();
    }
    res.status(200).json(response);
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.isFollowed = async (req, res) => {
  //const followerID = req.user;
  try {
    const username = req.params.username;

    const user = await FollowUser.getUserByEmailOrUsername(username);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    const toFollowID = user._id;
    const followerID = req.user._id;

    if (!toFollowID || !followerID) {
      console.error("this user not found:");
      return res.status(404).json({ error: "User not found" });
    }
    const isFollowed = user.followers.includes(followerID);
    res.status(200).json({ isFollowed: isFollowed });
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("followers");
    if (!user || !user.followers) {
      return res
        .status(404)
        .json({ error: "User not found or has no followers" });
    }
    const followers = user.followers.map((follower) => ({
      isFollowed: follower.followers.includes(userId),
      username: follower.username,
      avatar: follower.avatar,
    }));

    // Send the followers data in the response
    res.status(200).json({ followers });
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
