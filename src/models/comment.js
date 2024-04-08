/**
 * Module dependencies.
 */
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./user");
require("./post");

/**
 * @typedef {Object} CommentObject
 * @property {string} id - The unique identifier of the comment.
 * @property {string} content - The content of the comment.
 * @property {Object} user - The user who made the comment.
 * @property {number} likes_count - The number of likes the comment has received.
 * @property {number} replies_count - The number of replies the comment has received.
 * @property {boolean} is_reply - Indicates whether the comment is a reply to another comment.
 * @property {string[]} media - URLs of any attached media.
 * @property {Date} created_at - The date and time when the comment was created.
 * @property {boolean} is_hidden - Indicates whether the comment is hidden.
 * @property {boolean} is_saved - Indicates whether the comment is saved by the user.
 * @property {string} post_title - The title of the post associated with the comment.
 * @property {string} community_title - The title of the community where the comment was posted.
 */

/**
 * Comment Schema definition.
 * @type {mongoose.Schema<object>}
 * @param {object} comment - Comment object.
 */

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

/**
 * Static method: Retrieves a comment object.
 * @param {object} comment - The comment object.
 * @param {string} userid - The ID of the user.
 * @param {boolean} [withUserInfo=true] - Indicates whether to include user information.
 * @returns {Promise<CommentObject>} The comment object.
 */

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

/**
 * Static method: Retrieves comment replies.
 * @param {object} comment - The comment object.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} The comment object with replies.
 */

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