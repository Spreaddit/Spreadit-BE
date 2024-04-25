const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./conversation");
require("./user");

const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "conversation",
    },
    conversationSubject: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
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
      enum: ["text", "comment", "mention"], // Enum for different content types
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

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
