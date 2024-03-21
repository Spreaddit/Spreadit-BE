const UnfollowUser = require("../models/user");

exports.unfollowUser = async (req, res) => {
  //const followerID = req.user;

  try {
    const toUnfollowID = req.body.userID;
    const unfollowerID = req.body.followID; //will be removed
    // const { toUnfollowID } = toFollowUser;

    // const tofollow = await FollowUser.findById(toUnfollowID);
    // if (!tofollow) {
    //   console.error("this user not found:");
    //   return res.status(404).json({ error: "User not found" });
    // }

    const unfollowerUser = await UnfollowUser.findByIdAndUpdate(
      unfollowerID, // User being followed
      { $pull: { followings: toUnfollowID } }, // Add follower's ID to the followers array, using $addToSet to ensure uniqueness
      { new: true } // To return the updated document after the update operation
    );

    const tounfollowUser = await UnfollowUser.findByIdAndUpdate(
      toUnfollowID, // User being followed
      { $pull: { followers: unfollowerID } }, // Add follower's ID to the followers array, using $addToSet to ensure uniqueness
      { new: true } // To return the updated document after the update operation
    );
    if (!tounfollowUser) {
      console.error("user not found:");
      return res.status(404).json({ error: "user not found" });
    }
    const response = {
      status: "success",
    };
    res.status(200).json(response);
  } catch (err) {
    console.error("Error unfollow user", err);
    res.status(500).json({ error: "Error unfollow user" });
  }
};
