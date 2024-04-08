const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: "user"
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "post",
    },
    commentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "comment",
    },
    reason: {
        type: String,
        trim: true,
        maxLength: 200,

    },
    sureason: {
        type: String,
        trim: true,
        maxLength: 200,
    }
  },
  {
    timestamps: true
  }
);

const Like = mongoose.model("report", ReportSchema);

module.exports = Like;
