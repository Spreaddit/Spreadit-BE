const FollowUser = require("../models/user");
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
    const toFollowID = user._id;
    const followerID = req.user._id;
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

    await FollowUser.updateOne(
      { _id: toFollowID }, // Filter to find the user by their ID
      { $set: { newFollowers: true } } // Update operation using $set to set 'newFollowers' to true
    );
    if (!followerUser) {
      return res.status(404).json({ error: "user not found" });
    }
    const response = {
      description: "User followed successfully",
    };
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
    const followerUser = await FollowUser.findByIdAndUpdate(
      followerID, // User being followed
      { $addToSet: { followings: toFollowID } }, // Add follower's ID to the followers array, using $addToSet to ensure uniqueness
      { new: true } // To return the updated document after the update operation
    );
    const isFollowed = user.followers.includes(followerID);
    res.status(200).json({ isFollowed: isFollowed });
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
