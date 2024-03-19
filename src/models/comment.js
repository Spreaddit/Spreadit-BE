const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        }, 
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },

        postId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "post",
        },
        parentCommentId: {
            //Assumption if it's null then this means that the comment itself is a parent comment
            type: Schema.Types.ObjectId,
            required: true,
            ref: "post",

        },
        isLocked: {
            type: Boolean,
            default: false,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        isSpam: {
            type: Boolean,
            default: false,
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
        vote: {
            type: Int32,
            default: 0,
        },
    }, 
    {
        timestamps: true,
    }
);


const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;