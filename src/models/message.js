const mongoose = require("mongoose");
const Community = require("./community");
const Schema = mongoose.Schema;
require("./conversation");
require("./user");
require("./community");

const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "conversation",
    },
    conversationSubject: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    senderType: {
      type: String,
      default: "user",
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    recieverId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    parentMessageId: {
      // If it's null, then this means that the message itself is a parent message
      type: Schema.Types.ObjectId,
      index: true,
      ref: "message",
      default: null,
    },
    contentType: {
      type: String,
      enum: ["text", "comment", "mention"],
      required: true,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
    sentTime: {
      type: Date,
      default: Date.now,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.statics.getMessageObject = async function (message, userId) {
  const User = mongoose.model("user");

  let relatedUser;
  let direction;

  if (message.senderId.equals(userId)) {
    relatedUser = await User.findById(message.recieverId);
    direction = "outgoing";
  } else if (message.recieverId.equals(userId)) {
    if (message.senderType == "user") {
      relatedUser = await User.findById(message.senderId);
    } else {
      relatedUser = await Community.findById(message.senderId);
    }
    direction = "incoming";
  }
  let username;

  if (message.senderType == "user") {
    username = relatedUser ? relatedUser.username : null;
  } else if (message.senderType == "community") {
    username = relatedUser ? relatedUser.name : null;
  }
  const type = message.contentType;

  return {
    _id: message._id,
    conversationId: message.conversationId,
    senderType: message.senderType,
    relatedUserOrCommunity: username,
    type: type,
    content: message.content,
    time: message.sentTime,
    direction: direction,
    isRead: message.isRead,
    isDeleted: message.isDeleted,
    subject: message.conversationSubject,
  };
};

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
