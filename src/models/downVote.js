const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DownVoteSchema = new Schema(
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

const DownVote = mongoose.model("downVote", DownVoteSchema);

module.exports = DownVote;
