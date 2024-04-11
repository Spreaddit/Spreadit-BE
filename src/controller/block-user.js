const BlockUser = require("../models/user");
const jwt = require("jsonwebtoken");
exports.blockUser = async (req, res) => {
  //const followerID = req.user;

  try {
    const username = req.body.username;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const user = await BlockUser.getUserByEmailOrUsername(username);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    const toBlockID = user._id;

    const blockerID = req.user._id;
    if (!blockerID) {
      console.error("please login first:");
      return res.status(404).json({ error: "user not found" });
    }
    if (!toBlockID) {
      console.error("user not found:");
      return res.status(404).json({ error: "user not found" });
    }
    const blockerUser = await BlockUser.findByIdAndUpdate(
      blockerID,
      { $addToSet: { blockedUsers: toBlockID } },
      { new: true }
    );
    const toBlockUser = await BlockUser.findById(toBlockID);

    const response = {
      description: "User blocked successfully",
    };
    res.status(200).json(response);
  } catch (err) {
    console.error("Error block user", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
