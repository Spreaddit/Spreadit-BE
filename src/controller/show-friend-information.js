const ShowFriend = require("../models/user");

exports.showFriend = async (req, res) => {
  //const followerID = req.user;

  try {
    friendID = req.params.id;
    friendInf = await ShowFriend.findById(friendID);
    if (!friendInf) {
      console.error("Friend not found");
      return res.status(404).json({ error: "Friend not found" });
    }
    // if (!followerUser) {
    //   console.error("please login first:");
    //   return res.status(404).json({ error: "please loin first" });
    // }
    // if (!tofollowUser) {
    //   console.error("user not found:");
    //   return res.status(404).json({ error: "user not found" });
    // }
    const { name, username, email, location, bio, avatar, background_picture } =
      friendInf;

    const responseData = {
      name,
      username,
      email,
      location,
      bio,
      avatar,
      background_picture,
    };

    const response = {
      status: "success",
      data: {
        information: responseData,
      },
    };
    res.status(200).json(response);
  } catch (err) {
    console.error("Error ", err);
    res.status(500).json({ error: "Error " });
  }
};
