const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "message",
        index: true,
      },
    ],
    subject: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("conversation", ConversationSchema);

module.exports = Conversation;
