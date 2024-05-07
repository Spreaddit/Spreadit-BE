const Community = require("../models/community");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Report = require("../models/report.js");
const Message = require("../models/message");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Conversation = require("../models/conversation");
const Notification = require("../models/notification");
const NotificationType = require("../../seed-data/constants/notificationType");
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
    if (!recieverUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const recieverId = recieverUser._id;
    if (recieverId.toString() === userId.toString())
      return res.status(400).json({ error: "user cannot message himself" });
    const newConversation = new Conversation({
      subject,
    });
    if (recieverUser.sendYouPrivateMessages == "Nobody") {
      return res.status(403).json({ message: "you cannot message this user" });
    }
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

    const messageObj = await Message.getMessageObject(newMessage, userId);
    await Notification.sendNotification(
      recieverId,
      "You have recieved a new notification",
      `${req.user.username} send you a message`
    );
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
    const messageId = req.params.messageId;

    const messageToReply = await Message.findById(messageId);
    if (!messageToReply)
      return res.status(404).json({ error: "Message not found" });

    const senderId = messageToReply.recieverId;
    if (senderId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to reply to this message" });
    }

    const content = req.body.content;
    if (!content) {
      return res.status(400).json({ error: "Message content is required" });
    }

    const recieverId = messageToReply.senderId;
    if (recieverId.toString() === userId.toString())
      return res.status(400).json({ error: "User cannot reply to themselves" });

    const conversationId = messageToReply.conversationId;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const conversationSubject = conversation.subject;
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

    const index = conversation.messages.findIndex(
      (msgId) => msgId.toString() === messageId
    );

    conversation.messages.splice(index + 1, 0, newReply._id);

    await conversation.save();
    const reolyObj = await Message.getMessageObject(newReply, userId);
    await Notification.sendNotification(
      recieverId,
      "You have recieved a new notification",
      `${req.user.username} send reply on your message`
    );
    res.status(201).send({
      messageContent: reolyObj,
      message: "Reply sent successfully",
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getInboxMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderUser = await User.findById(userId);
    const inboxMessages = await Message.find({
      recieverId: userId,
      isDeleted: false,
    });
    if (inboxMessages.length == 0) {
      return res.status(404).json({ error: "No messages found" });
    }
    inboxMessagesWithStatus = await Promise.all(
      inboxMessages.map(async (message) => {
        const messageObj = await Message.getMessageObject(message, userId);
        return messageObj;
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
    const conversation = await Conversation.findById(
      existMessage.conversationId
    );

    if (existMessage.parentMessageId != null) {
      const parent = await Message.findById(existMessage._id);
      parent.isDeleted = true;
      await parent.save();

      await conversation.save();
    } else {
      const childrenMessages = await Message.find({
        conversationId: existMessage.conversationId,
      });

      for (const childMessage of childrenMessages) {
        const deletedMessage = await Message.findById(childMessage._id);
        deletedMessage.isDeleted = true;
        await deletedMessage.save();
      }
      await conversation.save();
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error delete message :", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.getAllMessages = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find().populate("messages");

    const userConversations = conversations.filter((conversation) => {
      return conversation.messages.some((message) => {
        return (
          message.senderId.equals(userId) || message.recieverId.equals(userId)
        );
      });
    });

    if (!userConversations || userConversations.length === 0) {
      return res.status(404).json({ error: "No conversations found" });
    }

    const allMessages = [];

    for (const conversation of userConversations) {
      for (const message of conversation.messages) {
        const messageObj = await Message.getMessageObject(message, userId);
        if (message.recieverId.equals(userId) && message.isDeleted) {
        } else allMessages.push(messageObj);
      }
    }

    res.status(200).json(allMessages);
  } catch (error) {
    console.error("Error getting messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPostReplies = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderUser = await User.findById(userId);
    const allMessages = await Message.find({
      recieverId: userId,
      contentType: "comment",
      isDeleted: false,
    });
    if (allMessages.length == 0) {
      return res.status(404).json({ error: "No messages found" });
    }
    allMessagesWithStatus = await Promise.all(
      allMessages.map(async (message) => {
        const messageObj = await Message.getMessageObject(message, userId);
        return messageObj;
      })
    );
    res.status(200).json(allMessagesWithStatus);
  } catch (error) {
    console.error("Error get message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.getUserMentions = async (req, res) => {
  try {
    const userId = req.user._id;
    const senderUser = await User.findById(userId);
    const allMessages = await Message.find({
      recieverId: userId,
      contentType: "mention",
      isDeleted: false,
    });
    if (allMessages.length == 0) {
      return res.status(404).json({ error: "No messages found" });
    }
    allMessagesWithStatus = await Promise.all(
      allMessages.map(async (message) => {
        const messageObj = await Message.getMessageObject(message, userId);
        return messageObj;
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
    allMessagesWithStatus = await Promise.all(
      allMessages.map(async (message) => {
        const messageObj = await Message.getMessageObject(message, userId);
        return messageObj;
      })
    );
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
      isDeleted: false,
    });
    if (unreadMessages.length == 0) {
      return res.status(404).json({ error: "No unread messages found" });
    }
    unreadMessagesWithStatus = await Promise.all(
      unreadMessages.map(async (message) => {
        const messageObj = await Message.getMessageObject(message, userId);
        return messageObj;
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
      message.isRead = true;
      await message.save();
    });
    res.status(200).json({ message: "Messages marked as read successfully" });
  } catch (error) {
    console.error("Error get message :", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.getUnreadMessageCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const unreadMessageCount = await Message.countDocuments({
      recieverId: userId,
      isRead: false,
      isDeleted: false,
    });

    res.status(200).json({ unreadMessageCount });
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.reportMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const userId = req.user._id;

    if (!messageId || messageId.length !== 24) {
      return res.status(404).json({ message: "Message not found" });
    }
    const { reason, subreason } = req.body;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).send({
        message: "message not found",
      });
    }
    if (!userId.equals(message.recieverId)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to report this message" });
    }

    if (!reason || !subreason) {
      return res.status(400).send({
        message: "invalid report data must send reason",
      });
    }

    const report = new Report({
      userId: userId,
      messageId: messageId,
      reason: reason,
      subreason: subreason,
    });

    await report.save();

    res.status(200).send({
      message: "Message reported successfully",
    });
  } catch (error) {
    console.error("Error reporting message:", error);
    res.status(500).send({
      error: "An error occurred while reporting the message",
    });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const messageId = req.params.messageId;
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (
      message.senderId.toString() !== userId.toString() &&
      message.recieverId.toString() !== userId.toString()
    ) {
      return res.status(403).json({ error: "Unauthorized access to message" });
    }
    const messageObj = await Message.getMessageObject(message, userId);
    res.status(200).json(messageObj);
  } catch (error) {
    console.error("Error getting message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
