const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./user");
require("./post");

const CommentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            //required: true,
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
        upVotes: {
            type: [],
            default: null
        },
        downVotes: {
            type: [],
            default: null
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
        hiddenBy: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        savedBy: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],

    },
    {
        timestamps: true,
    }
);

CommentSchema.statics.getCommentObject = async function (
    comment,
    userid,
    withUserInfo = true
  ) {
    //console.log(comment.username);
    const likesCount = comment.upVotes.length - comment.downVotes.length;
    const repliesCount = await Comment.countDocuments({
        parentCommentId: comment._id,
    });
    console.log(userid);
    let userObject = {};
    
    if (withUserInfo) {
      const User = mongoose.model("user");
      if(userid === comment.userId ){
      const user = await User.findOne({ _id: comment.userId });
      console.log(user);
      userObject = await User.generateUserObject(user, userid);
      }
      else{
        userObject = await User.generateUserObject(comment.userId, userid);
      }
    }
    const Post = mongoose.model("post");
    const isHidden = comment.hiddenBy.includes(userid);
    const isSaved = comment.savedBy.includes(userid);
    const post = await Post.findOne({ _id: comment.postId });
    const postTitle = post.title;
    const subredditTitle = post.community;

    const commentInfo = {
      id: comment._id,
      content: comment.content,
      user: userObject,
      likes_count: likesCount,
      replies_count: repliesCount,
      is_reply: comment.parentCommentId != null ? true : false,
      media: comment.attachments,
      created_at: comment.createdAt,
      is_hidden: isHidden,
      is_saved: isSaved,
      post_title: postTitle,
      community_title: subredditTitle,
    };
    return commentInfo;
};

CommentSchema.statics.getCommentReplies = async function (comment, userId) {
    const replyComment = await Comment.find({
        parentCommentId: comment.id,
    });
    comment.replies = [];
    for (let i = 0; i < replyComment.length; i++) {
      const commentReply = replyComment[i];
      const commentObject = await Comment.getCommentObject(commentReply, userId);
      comment.replies.push(commentObject);
    }
    return comment;
};


const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;