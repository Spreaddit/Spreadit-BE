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

    const messageObj = await Message.getMessageObject(newMessage, userId);

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

    // Check if the message being replied to exists
    const messageToReply = await Message.findById(messageId);
    if (!messageToReply)
      return res.status(404).json({ error: "Message not found" });

    // Check if the user is authorized to reply to this message
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

    // Ensure the user is not replying to themselves
    const recieverId = messageToReply.senderId;
    if (recieverId.toString() === userId.toString())
      return res.status(400).json({ error: "User cannot reply to themselves" });

    const conversationId = messageToReply.conversationId;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Create the new reply message
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

    // Find the index of the message being replied to in the conversation messages array
    const index = conversation.messages.findIndex(
      (msgId) => msgId.toString() === messageId
    );

    // Insert the new reply message after the message being replied to
    conversation.messages.splice(index + 1, 0, newReply._id);

    // Save the updated conversation
    await conversation.save();
    const reolyObj = await Message.getMessageObject(newReply, userId);
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
    const inboxMessages = await Message.find({ recieverId: userId });
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
      // Check if the user is the sender or receiver in any message of the conversation
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

    // Iterate over each conversation and extract messages
    for (const conversation of userConversations) {
      for (const message of conversation.messages) {
        const messageObj = await Message.getMessageObject(message, userId);
        allMessages.push(messageObj);
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

exports.getUnreadMessageCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const unreadMessageCount = await Message.countDocuments({
      recieverId: userId,
      isRead: false,
    });

    res.status(200).json({ unreadMessageCount });
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
