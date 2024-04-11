const UnfollowUser = require("../models/user");
const jwt = require("jsonwebtoken");

exports.unfollowUser = async (req, res) => {
  //const followerID = req.user;

  try {
    const username = req.body.username;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const user = await UnfollowUser.getUserByEmailOrUsername(username);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    const toUnfollowID = user._id;

    const unfollowerID = req.user._id;
    if (!toUnfollowID || !unfollowerID) {
      console.error("this user not found:");
      return res.status(404).json({ error: "User not found" });
    }

    const unfollowerUser = await UnfollowUser.findByIdAndUpdate(
      unfollowerID,
      { $pull: { followings: toUnfollowID } }, // Add to follow ID to the followers array, using $addToSet to ensure uniqueness
      { new: true } // To return the updated document after the update operation
    );

    const tounfollowUser = await UnfollowUser.findByIdAndUpdate(
      toUnfollowID, // User being followed
      { $pull: { followers: unfollowerID } }, // Add follower's ID to the followers array, using $addToSet to ensure uniqueness
      { new: true } // To return the updated document after the update operation
    );
    const response = {
      description: "User unfollowed successfully",
    };
    res.status(200).json(response);
  } catch (err) {
    console.error("Error unfollow user", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
