const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./user");
require("./post");
require("./community");

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
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
      default: null,
    },
    downVotes: {
      type: [],
      default: null,
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
    isRemoved: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isRemoval: {
      type: Boolean,
      default: false,
    },
    lastEdit: {
      type: String,
      default: "",
    },
    repliesCount: {
      type: Number,
      default: 0,
    },
    attachments: [
      {
        type: {
          type: String,
          default: "",
        },
        link: {
          type: String,
          default: "",
        },
      },
    ],
    hiddenBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    savedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
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
  const likesCount = comment.upVotes.length - comment.downVotes.length;
  const repliesCount = await Comment.countDocuments({
    parentCommentId: comment._id,
  });
  let userObject = {};

  if (withUserInfo) {
    const User = mongoose.model("user");
    if (userid === comment.userId) {
      const user = await User.findOne({ _id: comment.userId });
      userObject = await User.generateUserObject(user, userid);
    } else {
      const user = await User.findOne({ _id: comment.userId });
      userObject = await User.generateUserObject(user, userid);
    }
  }
  const Post = mongoose.model("post");
  const isHidden = comment.hiddenBy.includes(userid);
  const isSaved = comment.savedBy.includes(userid);
  const isUpvoted = comment.upVotes.includes(userid);
  const isDownVoted = comment.downVotes.includes(userid);
  let postTitle;
  let subredditTitle;
  let postId;
  if (comment.parentCommentId === null) {
    const post = await Post.findOne({ _id: comment.postId });
    if (post) {
      postTitle = post.title;
      subredditTitle = post.community;
      postId = comment.postId;
    }
  } else {
    let parentComment = comment;
    while (parentComment.parentCommentId !== null) {
      parentComment = await Comment.findById(parentComment.parentCommentId);
    }
    const post = await Post.findOne({ _id: parentComment.postId });
    if (post) {
      postTitle = post.title;
      subredditTitle = post.community;
      postId = post._id;
    }
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
    is_upvoted: isUpvoted,
    is_downvoted: isDownVoted,
    postId: postId,
    last_edit: comment.lastEdit,
    is_removed: comment.isRemoved,
    is_approved: comment.isApproved,
    is_locked: comment.isLocked,
    is_removal: comment.isRemoval,
    replies: [],
  };

  return commentInfo;
};

CommentSchema.statics.getCommentReplies = async function (comment, userId) {
  const replyComments = await Comment.find({
    parentCommentId: comment.id,
  });

  for (let i = 0; i < replyComments.length; i++) {
    const reply = replyComments[i];
    const replyObject = await Comment.getCommentObject(reply, userId, true);
    const nestedReplies = await Comment.getCommentReplies(replyObject, userId);
    replyObject.replies = nestedReplies.replies;
    comment.replies.push(replyObject);
  }
  return comment;
};

CommentSchema.statics.getCommentRepliesss = async function (comment, userId) {
  const replyComments = await Comment.find({
    parentCommentId: comment.id,
  });

  comment.replies = [];

  for (let i = 0; i < replyComments.length; i++) {
    const reply = replyComments[i];
    const replyObject = await Comment.getCommentObject(reply, userId, true);
    const nestedReplies = await Comment.getCommentReplies(replyObject, userId);
    replyObject.replies = nestedReplies.replies;
    comment.replies.push(replyObject);
  }

  return comment.replies;
};

CommentSchema.statics.findRootComment = async (commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return null;
  }
  if (comment.parentCommentId) {
    return Comment.findRootComment(comment.parentCommentId);
  }
  return comment;
};

CommentSchema.statics.getCommentInfoSimplified = async function (comment) {
  const Post = mongoose.model("post");
  const User = mongoose.model("user");
  const Community = mongoose.model("community");
  const user = await User.findById(comment.userId).lean();
  const post = comment.postId
    ? await Post.findById(comment.postId).populate("community").lean()
    : null;
  const communityName = post && post.community ? post.community : "";
  const community = communityName
    ? await Community.findOne({ name: communityName }).lean()
    : null;

  return {
    commentId: comment._id,
    commentContent: comment.content,
    commentVotes: comment.upVotes.length - comment.downVotes.length,
    commentDate: comment.createdAt,
    communityName: communityName,
    communityProfilePic: community ? community.image : "",
    username: user ? user.username : "",
    userProfilePic: user ? user.avatar : "",
    postId: post ? post._id : "",
    postDate: post ? post.createdAt : "",
    postVotes: post ? post.upVotes.length - post.downVotes.length : 0,
    postCommentsCount: post ? post.commentsCount : 0,
    postTitle: post ? post.title : "",
    attachments: comment.attachments,
  };
};

const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;
