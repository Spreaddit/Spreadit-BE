const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./user");
require("./post");
require("./community");
const commentSchema = require("../models/comment");

const PostSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    upVotes: {
      type: [],
      default: null,
    },
    downVotes: {
      type: [],
      default: null,
    },
    sharesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    numberOfViews: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
    },
    content: [
      {
        type: String,
      },
    ],
    community: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Post", "Images & Video", "Link", "Poll"],
      default: "Post",
    },
    pollOptions: [
      {
        option: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
    pollExpiration: {
      type: Date,
      default: null,
    },
    isPollEnabled: {
      type: Boolean,
      default: false,
    },
    pollVotingLength: {
      type: String,
      enum: [
        "1 Day",
        "2 Days",
        "3 Days",
        "4 Days",
        "5 Days",
        "6 Days",
        "7 Days",
      ],
      default: "3 Days",
    },
    votedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    link: {
      type: String,
    },
    attachments: [
      {
        type: {
          type: String,
          enum: ["image", "video"],
        },
        link: {
          type: String,
        },
      },
    ],
    isSpoiler: {
      type: Boolean,
      default: false,
    },
    isNsfw: {
      type: Boolean,
      default: false,
    },
    isSpam: {
      type: Boolean,
      default: false,
    },
    isRemoved: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    isScheduled: {
      type: Boolean,
      default: false,
    },
    removalReason: {
      type: String,
    },
    sendPostReplyNotification: {
      type: Boolean,
      default: true,
    },
    isCommentsLocked: {
      type: Boolean,
      default: false,
    },
    hiddenBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

PostSchema.statics.getPostObject = async function (
  post,
  userId,
  includeHidden = false,
  includeScheduled = false
) {
  if (!includeScheduled && post.isScheduled) {
    return null;
  } else if (includeScheduled && !post.isScheduled) {
    return null;
  }
  const User = mongoose.model("user");
  const Community = mongoose.model("community");
  const loginUser = await User.findById(userId);
  if (!loginUser.adultContent && post.isNsfw) {
    return null;
  }
  const postUser = await User.findById(post.userId);
  const postcommunity = await Community.findOne({ name: post.community });
  const hasUpvoted = post.upVotes.includes(userId);
  const hasDownvoted = post.downVotes.includes(userId);
  const savedPostIds = loginUser.savedPosts || [];
  let hasVotedOnPoll = false;
  let userSelectedOption = null;
  if (post.pollOptions.length > 0 && loginUser.selectedPollOption) {
    userSelectedOption = loginUser.selectedPollOption;
    hasVotedOnPoll = userSelectedOption !== null;
  }

  const isHiddenByUser = post.hiddenBy.includes(userId);
  if (isHiddenByUser && !includeHidden) {
    return null;
  }

  post.numberOfViews++;
  await post.save();

  return {
    _id: post._id,
    userId: userId,
    username: postUser.username,
    userProfilePic: postUser.avatar,
    hasUpvoted: hasUpvoted,
    hasDownvoted: hasDownvoted,
    hasVotedOnPoll: hasVotedOnPoll,
    selectedPollOption: userSelectedOption,
    numberOfViews: post.numberOfViews,
    votesUpCount: post.upVotes ? post.upVotes.length : 0,
    votesDownCount: post.downVotes ? post.downVotes.length : 0,
    sharesCount: post.sharesCount,
    commentsCount: post.commentsCount,
    title: post.title,
    content: post.content,
    community: post.community,
    communityIcon: postcommunity ? postcommunity.image : null,
    type: post.type,
    link: post.link,
    pollExpiration: post.pollExpiration,
    isPollEnabled: post.isPollEnabled,
    pollVotingLength: post.pollVotingLength,
    isSpoiler: post.isSpoiler,
    isNsfw: post.isNsfw,
    sendPostReplyNotification: post.sendPostReplyNotification,
    isCommentsLocked: post.isCommentsLocked,
    isSaved: savedPostIds.includes(post._id.toString()),
    isRemoved: post.isRemoved,
    removalReason: post.removalReason,
    isApproved: post.isApproved,
    isScheduled: post.isScheduled,
    isSpam: post.isSpam,
    date: post.date,
    pollOptions: post.pollOptions,
    attachments: post.attachments,
  };
};

PostSchema.statics.getPostResultObject = async function (post, userId) {
  const User = mongoose.model("user");
  const Community = mongoose.model("community");
  const isHiddenByUser = post.hiddenBy.includes(userId);
  if (isHiddenByUser && !includeHidden) {
    return null;
  }
  if (post.isScheduled) {
    return null;
  }
  const user = await User.findById(post.userId).lean();
  const username = user ? user.username : null;
  const userProfilePic = user && user.avatar ? user.avatar : null;

  const community = await Community.findOne({ name: post.community }).lean();
  const communityname = community ? community.name : null;
  const communityProfilePic = community ? community.image : null;

  const postResultObject = {
    postId: post._id.toString(),
    title: post.title,
    content: post.content,
    isnsfw: post.isNsfw || false,
    isSpoiler: post.isSpoiler || false,
    votesCount: (post.upVotes.length || 0) - (post.downVotes.length || 0),
    commentsCount: post.commentsCount || 0,
    date: post.date,
    username: username,
    userProfilePic: userProfilePic,
    attachments: post.attachments || [],
    communityname: communityname,
    communityProfilePic: communityProfilePic,
  };

  return postResultObject;
};

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
