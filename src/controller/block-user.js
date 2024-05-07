const BlockUser = require("../models/user");
const jwt = require("jsonwebtoken");
exports.blockUser = async (req, res) => {
  try {
    const username = req.body.username;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const user = await BlockUser.getUserByEmailOrUsername(username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const toBlockID = user._id;

    const blockerID = req.user._id;

    if (toBlockID.equals(blockerID)) {
      return res.status(400).json({ error: "user cannot block himself" });
    }
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

exports.unBlock = async (req, res) => {
  try {
    const username = req.body.username;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const user = await BlockUser.getUserByEmailOrUsername(username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const toUnblockId = user._id;

    const unBlockerId = req.user._id;

    if (toUnblockId.equals(unBlockerId)) {
      return res.status(400).json({ error: "user cannot unblock himself" });
    }
    if (!toUnblockId || !unBlockerId) {
      console.error("this user not found:");
      return res.status(404).json({ error: "User not found" });
    }

    const tounblockerUser = await BlockUser.findByIdAndUpdate(
      unBlockerId,
      { $pull: { blockedUsers: toUnblockId } },
      { new: true }
    );
    const response = {
      description: "User unBlocked successfully",
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
