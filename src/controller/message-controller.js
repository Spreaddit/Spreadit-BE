const Community = require("../models/community");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Message = require("../models/message");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Conversation = require("../models/conversation");

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
    const recieverId = recieverUser._id;
    if (recieverId === userId)
      return res.status(400).json({ error: "user cannot message himself" });
    const newConversation = new Conversation({
      subject,
    });
    await newConversation.save();
    const newMessage = new Message({
      conversationId: newConversation._id,
      senderId: userId,
      recieverId,
      contentType: "text",
      content,
    });
    await newMessage.save();
    await Conversation.findByIdAndUpdate(newConversation._id, {
      $addToSet: { messages: newMessage._id },
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error send message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.replyMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderUser = await User.findById(userId);
    const messageId = req.params.messageId;
    const messageToReply = await Message.findById(messageId);
    if (!messageToReply)
      return res.status(404).json({ error: "message not found" });
    const recieverId = messageToReply.senderId;

    const content = req.body.content;
    if (!content) {
      return res.status(400).json({ error: "message content is required" });
    }
    if (recieverId === userId)
      return res.status(400).json({ error: "user cannot reply on himself" });

    const conversationId = messageToReply.conversationId;
    const newReply = new Message({
      conversationId: conversationId,
      senderId: userId,
      recieverId,
      contentType: "text",
      content,
    });
    await newReply.save();
    newReply.parentMesssageId = messageId;
    await Conversation.findByIdAndUpdate(conversationId, {
      $addToSet: { messages: newReply._id },
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error send message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.getInboxMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderUser = await User.findById(userId);
    const inboxMessages = await Message.find({ recieverId: userId });
    if (inboxMessages.length == 0) {
      return res.status(404).json({ error: "No messages found" });
    }
    res.status(200).json(inboxMessages);
  } catch (error) {
    console.error("Error get message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const messageId = req.params.messageId;
    if (!messageId || messageId.length !== 24) {
      return res.status(404).json({ message: "message not found" });
    }
    const senderUser = await User.findById(userId);
    const existMessage = await Message.findById(messageId);
    if (!existMessage) {
      return res
        .status(404)
        .json({ error: "Message not found or already deleted" });
    }
    const message = await Message.findByIdAndDelete(messageId);

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error delete message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderUser = await User.findById(userId);
    const allMessages = await Message.find({
      recieverId: userId,
      contentType: "text",
    });
    if (allMessages.length == 0) {
      return res.status(404).json({ error: "No messages found" });
    }
    res.status(200).json(allMessages);
  } catch (error) {
    console.error("Error get message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};
exports.getPostReplies = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderUser = await User.findById(userId);
    const allMessages = await Message.find({
      recieverId: userId,
      contentType: "comment",
    });
    if (allMessages.length == 0) {
      return res.status(404).json({ error: "No messages found" });
    }
    res.status(200).json(allMessages);
  } catch (error) {
    console.error("Error get message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.getSentMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderUser = await User.findById(userId);
    const allMessages = await Message.find({
      senderId: userId,
      contentType: "text",
    });
    if (allMessages.length == 0) {
      return res.status(404).json({ error: "No messages found" });
    }
    res.status(200).json(allMessages);
  } catch (error) {
    console.error("Error get message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};
