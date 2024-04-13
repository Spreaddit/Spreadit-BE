
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
            required: false,
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
                type: {
                    type: String,
                    default: '' 
                },
                link: {
                    type: String,
                    default: '' 
                }
            }
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
    //console.log(userid);
    let userObject = {};
    
    if (withUserInfo) {
      const User = mongoose.model("user");
      if(userid === comment.userId ){
      const user = await User.findOne({ _id: comment.userId });
      //console.log(user);
      userObject = await User.generateUserObject(user, userid);
      //console.log(userObject);
      }
      else{
        const user = await User.findOne({ _id: comment.userId });
        userObject = await User.generateUserObject(user, userid);

      }
    }
    const Post = mongoose.model("post");
    const isHidden = comment.hiddenBy.includes(userid);
    const isSaved = comment.savedBy.includes(userid);
    let postTitle; 
    let subredditTitle;
    if(comment.parentCommentId === null){
        const post = await Post.findOne({ _id: comment.postId });
        postTitle = post.title;
        subredditTitle = post.community;
    }
    else {
        const commentParent = await Comment.findById(comment.parentCommentId);
        const post = await Post.findOne({ _id: commentParent.postId });
        postTitle = post.title;
        subredditTitle = post.community;     
    }
    

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
      replies: [],
    };
    
    return commentInfo;
};


CommentSchema.statics.getCommentReplies = async function (comment, userId) {
    const replyComments = await Comment.find({
        parentCommentId: comment.id,
    });
    //console.log(replyComments);
    //comment.replies = [];
    for (let i = 0; i < replyComments.length; i++) {
        const reply = replyComments[i];
        const commentObject = await Comment.getCommentObject(reply, replyComments[i].userId, true);
        comment.replies.push(commentObject);
    }
    //console.log(comment);
    return comment;
};



const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;