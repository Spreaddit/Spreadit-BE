const BlockUser = require("../models/user");

exports.blockUser = async (req, res) => {
  //const followerID = req.user;

  try {
    const toBlockID = req.body.userID;
    const blockerID = req.body.followID; //will be removed
    // const { toBlock } = toBlockUser;

    // const tofollow = await BlockUser.findById(toBlock);
    // if (!tofollow) {
    //   console.error("this user not found:");
    //   return res.status(404).json({ error: "User not found" });
    // }

    const blockerUser = await BlockUser.findByIdAndUpdate(
      blockerID,
      { $addToSet: { blockedUsers: toBlockID } },
      { new: true }
    );
    const toBlockUser = await BlockUser.findById(toBlockID);
    if (!blockerUser) {
      console.error("please login first:");
      return res.status(404).json({ error: "please loin first" });
    }
    if (!toBlockUser) {
      console.error("user not found:");
      return res.status(404).json({ error: "user not found" });
    }
    const response = {
      status: "success",
    };
    res.status(200).json(response);
  } catch (err) {
    console.error("Error block user", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
