const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
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
    subject: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      enum: ["text", "comment"], // Enum for different content types
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
