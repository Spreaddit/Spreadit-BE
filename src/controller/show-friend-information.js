const ShowFriend = require("../models/user");
const jwt = require("jsonwebtoken");

exports.showFriend = async (req, res) => {
  //const followerID = req.user;

  try {
    const userName = req.params.username;
    if (!userName) {
      return res.status(400).json({ error: "Username is required" });
    }
    const user = await ShowFriend.getUserByEmailOrUsername(userName);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    friendID = user._id;
    friendInf = await ShowFriend.findById(friendID);
    if (!friendInf) {
      console.error("Friend not found");
      return res.status(404).json({ error: "user not found" });
    }
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
      data: {
        information: responseData,
      },
    };
    res.status(200).json(response);
  } catch (err) {
    console.error("Error ", err);
    res.status(500).json({ error: "Internal server error " });
  }
};
