const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        username: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
            ref: "user",
        },
        postId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "post",
        },
        parentCommentId: {
            // If it's null, then this means that the comment itself is a parent comment
            type: Schema.Types.ObjectId,
            index: true,
            ref: "comment",
            default: null,
        },
        votesUpCount: {
            type: Number,
            default: 0
        },
        votesDownCount: {
            type: Number,
            default: 0
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
        attachments: [
            {
              type: String,
              default: [],
            },
        ],

    },
    {
        timestamps: true,
    }
);

CommentSchema.statics.getTweetObject = async function (
    comment,
    username,
    withUserInfo = true
  ) {
    const Like = mongoose.model("like");
  
    //const likesCount = await Like.count({ commentId: comment._id });
    
    const repliesCount = await Comment.count({
        parentCommentId: comment._id,
    });
    // const likedTweet = await Like.findOne({
    //   commentId: comment._id,
    //   likerUsername: username,
    // });
  
    let userObject = {};
    if (withUserInfo) {
      const User = mongoose.model("user");
      const user = await User.findOne({ username: comment.username });
      userObject = await User.generateUserObject(user, username);
    }
  
    const commentInfo = {
      id: comment._id,
      content: comment.content,
      user: userObject,
      //likes_count: likesCount,
      replies_count: repliesCount,
      //is_liked: likedTweet != null ? true : false,
      is_reply: comment.parentCommentId != null ? true : false,
      media: comment.attachments,
      created_at: comment.createdAt,
    };
    return commentInfo;
};


CommentSchema.statics.getCommentReplies = async function (comment, username) {
    const replyComment = await Comment.find({
        parentCommentId: comment.id,
    });
    comment.replies = [];
    for (let i = 0; i < replyComment.length; i++) {
      const commentReply = replyComment[i];
      const commentObject = await Comment.getCommentObject(commentReply, username);
      comment.replies.push(commentObject);
    }
    return comment;
};


const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;