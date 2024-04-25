const Community = require("../models/community");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Message = require("../models/message");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Conversation = require("../models/conversation");
const { message } = require("../../seed-data/constants/notificationType");

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
    if (recieverId.toString() === userId.toString())
      return res.status(400).json({ error: "user cannot message himself" });
    const newConversation = new Conversation({
      subject,
    });
    await newConversation.save();
    const newMessage = new Message({
      conversationId: newConversation._id,
      senderId: userId,
      conversationSubject: subject,
      recieverId,
      contentType: "text",
      content,
    });
    await newMessage.save();
    await Conversation.findByIdAndUpdate(newConversation._id, {
      $addToSet: { messages: newMessage._id },
    });

    const messageObj = await Message.findById(newMessage._id);

    res.status(201).send({
      messageContent: messageObj,
      message: "Message sent successfully",
    });
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
    const senderId = messageToReply.recieverId;
    if (senderId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to reply to this message" });
    }

    const content = req.body.content;
    if (!content) {
      return res.status(400).json({ error: "message content is required" });
    }
    if (recieverId.toString() === userId.toString())
      return res.status(400).json({ error: "user cannot reply on himself" });

    const conversationId = messageToReply.conversationId;
    console.log(conversationId);
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    const conversationSubject = conversation.subject;
    console.log(conversationSubject);

    const newReply = new Message({
      conversationId: conversationId,
      senderId: userId,
      parentMessageId: messageId,
      conversationSubject: conversationSubject,
      recieverId,
      contentType: "text",
      content,
    });
    await newReply.save();
    await Conversation.findByIdAndUpdate(conversationId, {
      $addToSet: { messages: newReply._id },
    });
    const messageObj = await Message.findById(newReply._id);

    res.status(201).send({
      messageContent: messageObj,
      message: "Reply sent successfully",
    });
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
    inboxMessagesWithStatus = await Promise.all(
      inboxMessages.map(async (message) => {
        // Set isRead to true for each inbox message and save
        message.isRead = true;
        await message.save();

        // Add status attribute to each inbox message and return
        return {
          ...message.toObject(),
          status: "incoming",
        };
      })
    );
    res.status(200).json(inboxMessagesWithStatus);
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
      return res.status(404).json({ message: "Message not found" });
    }
    const senderUser = await User.findById(userId);
    const existMessage = await Message.findById(messageId);
    if (!existMessage) {
      return res
        .status(404)
        .json({ error: "Message not found or already deleted" });
    }
    if (existMessage.recieverId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this message" });
    }
    // Find the conversation associated with the message
    const conversation = await Conversation.findById(
      existMessage.conversationId
    );

    if (existMessage.parentMessageId != null) {
      const parent = await Message.findById(existMessage._id);
      parent.isDeleted = true;
      parent.save();

      // Save the updated conversation
      await conversation.save();
    } else {
      // Find all child messages (replies) associated with the parent message
      const childrenMessages = await Message.find({
        conversationId: existMessage.conversationId,
      });

      // Delete each child message and remove its ID from the conversation
      for (const childMessage of childrenMessages) {
        const deletedMessage = await Message.findById(childMessage._id);
        deletedMessage.isDeleted = true;
        deletedMessage.save();
      }
      // Save the updated conversation
      await conversation.save();
    }

    res
      .status(200)
      .json({ message: "Message and its replies deleted successfully" });
  } catch (error) {
    console.error("Error delete message :", error);
    return res.status(500).json({ error: "Internal server error" });
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
    allMessagesWithStatus = await Promise.all(
      allMessages.map(async (message) => {
        // Set isRead to true for each inbox message and save
        message.isRead = true;
        await message.save();

        // Add status attribute to each inbox message and return
        return {
          ...message.toObject(),
          status: "incoming",
        };
      })
    );
    res.status(200).json(allMessagesWithStatus);
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
    allMessagesWithStatus = allMessages.map((message) => {
      return {
        ...message.toObject(),
        status: "outgoing",
      };
    });
    res.status(200).json(allMessagesWithStatus);
  } catch (error) {
    console.error("Error get message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.readMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const messageId = req.params.messageId;
    const senderUser = await User.findById(userId);
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "No messages found" });
    }
    if (message.isRead == true) {
      return res.status(400).json({ error: "Message already marked as read" });
    }
    if (message.recieverId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to mark message as read" });
    }
    message.isRead = true;
    await message.save();

    res.status(201).send({
      messageContent: message,
      message: "Message marked as read successfully",
    });
  } catch (error) {
    console.error("Error get message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.unreadMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const messageId = req.params.messageId;
    const senderUser = await User.findById(userId);
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "No messages found" });
    }
    if (message.isRead == false) {
      return res
        .status(400)
        .json({ error: "Message already marked as unread" });
    }
    if (message.recieverId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to mark message as unread" });
    }
    message.isRead = false;
    await message.save();

    res.status(201).send({
      messageContent: message,
      message: "Message marked as unread successfully",
    });
  } catch (error) {
    console.error("Error get message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.getUnreadMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderUser = await User.findById(userId);
    const unreadMessages = await Message.find({
      recieverId: userId,
      isRead: false,
    });
    if (unreadMessages.length == 0) {
      return res.status(404).json({ error: "No unread messages found" });
    }
    unreadMessagesWithStatus = await Promise.all(
      unreadMessages.map(async (message) => {
        // Add status attribute to each inbox message and return
        return {
          ...message.toObject(),
          status: "incoming",
        };
      })
    );
    res.status(200).json(unreadMessagesWithStatus);
  } catch (error) {
    console.error("Error get message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderUser = await User.findById(userId);
    const inboxMessages = await Message.find({ recieverId: userId });
    if (inboxMessages.length == 0) {
      return res.status(404).json({ error: "No unread messages found" });
    }

    inboxMessages.map(async (message) => {
      // Set isRead to true for each inbox message and save
      message.isRead = true;
      await message.save();
    });
    res.status(200).json({ message: "Messages marked as read successfully" });
  } catch (error) {
    console.error("Error get message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};
