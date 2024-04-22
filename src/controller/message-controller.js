const Community = require("../models/community");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Message = require("../models/message");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.sendMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderUser = await User.findById(userId);
    const recieverUsername = req.body.username;
    if (!recieverUsername) {
      return res.status(400).json({ error: "Username is required" });
    }
    const subject = req.body.subject;
    if (!subject) {
      return res.status(400).json({ error: "subject is required" });
    }
    const content = req.body.content;
    if (!content) {
      return res.status(400).json({ error: "message content is required" });
    }
    const recieverUser = await User.getUserByEmailOrUsername(recieverUsername);
    recieverId = recieverUser._id;

    const newMessage = new Message({
      senderId: userId,
      recieverId,
      subject,
      contentType: "text",
      content,
    });
    await newMessage.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error send message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};
