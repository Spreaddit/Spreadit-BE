const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UpVoteSchema = new Schema(
  {
    likerUsername: {
      type: String,
      required: true,
      index: true,
      ref: "user",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "user"
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "post",
    },
  },
  {
    timestamps: true
  }
);

const UpVote = mongoose.model("upVote", UpVoteSchema);

module.exports = UpVote;
