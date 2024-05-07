const UnfollowUser = require("../models/user");
const jwt = require("jsonwebtoken");

exports.unfollowUser = async (req, res) => {
  try {
    const username = req.body.username;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const user = await UnfollowUser.getUserByEmailOrUsername(username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const toUnfollowID = user._id;

    const unfollowerID = req.user._id;

    if (toUnfollowID.equals(unfollowerID)) {
      return res.status(400).json({ error: "user cannot unfollow himself" });
    }
    if (!toUnfollowID || !unfollowerID) {
      return res.status(404).json({ error: "User not found" });
    }

    const unfollowerUser = await UnfollowUser.findByIdAndUpdate(
      unfollowerID,
      { $pull: { followings: toUnfollowID } },
      { new: true }
    );

    const tounfollowUser = await UnfollowUser.findByIdAndUpdate(
      toUnfollowID,
      { $pull: { followers: unfollowerID } },
      { new: true }
    );
    const response = {
      description: "User unfollowed successfully",
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
