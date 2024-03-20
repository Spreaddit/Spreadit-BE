const FollowUser = require("../models/user");

exports.followUser = async (req, res) => {
  //const followerID = req.user;

  try {
    const toFollowID = req.body.userID;
    const followerID = req.body.followID; //will be removed
    // const { toFollowID } = toFollowUser;

    // const tofollow = await FollowUser.findById(toFollowID);
    // if (!tofollow) {
    //   console.error("this user not found:");
    //   return res.status(404).json({ error: "User not found" });
    // }

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
      console.error("please login first:");
      return res.status(404).json({ error: "please loin first" });
    }
    if (!tofollowUser) {
      console.error("user not found:");
      return res.status(404).json({ error: "user not found" });
    }
    const response = {
      status: "success",
    };
    res.status(200).json(response);
  } catch (err) {
    console.error("Error follow user", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
