const ShowFriend = require("../models/user");
const jwt = require("jsonwebtoken");

exports.showFriend = async (req, res) => {
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
    const token = req.body.token;
    if (!token) {
      return res.status(400).json({ error: "please login first" });
    }
    friendID = user._id;
    friendInf = await ShowFriend.findById(friendID);
    if (!friendInf) {
      console.error("Friend not found");
      return res.status(404).json({ error: "user not found" });
    }
    const { name, username, email, location, bio, avatar, banner } = friendInf;
    const responseData = {
      name,
      username,
      email,
      location,
      bio,
      avatar,
      banner,
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
