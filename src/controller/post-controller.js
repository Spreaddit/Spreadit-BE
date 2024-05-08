const Post = require("../models/post");
const Comment = require("../models/comment.js");
const User = require("../models/user");
const Report = require("../models/report.js");
const Community = require("../models/community.js");
const mongoose = require("mongoose");
const Moderator = require("../models/moderator.js");
const BanUser = require("../models/banUser.js");
const UserRole = require("../models/constants/userRole.js");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
const Notification = require("./../models/notification");
const NotificationType = require("./../../seed-data/constants/notificationType");
require("./../models/constants/notificationType");
const { uploadMedia } = require("../service/cloudinary.js");

async function isModeratorOrCreator(userId, communityName) {
  const community = await Community.findOne({ name: communityName });
  if (!community) {
    return false;
  }
  if (community.creator.equals(userId)) {
    return true;
  }
  const isModerator = community.moderators.some((moderatorId) =>
    moderatorId.equals(userId)
  );
  if (isModerator) {
    return true;
  }

  return false;
}

async function checkPermission(username, communityName) {
  const moderator = await Moderator.findOne({ username, communityName });
  if (!moderator) {
    return false;
  }

  return moderator.managePostsAndComments === true;
}

exports.getPostById = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;
    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const user = await User.findById(post.userId);

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { recentPosts: postId } },
      { new: true }
    );
    const postObject = await Post.getPostObject(post, userId);
    const isHidden = postObject === null;
    postObject.isHidden = isHidden;

    res.status(200).json(postObject);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllUserPosts = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId = user._id;

    const posts = await Post.find({ userId });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "User has no posts" });
    }

    let postInfoArray = await Promise.all(
      posts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);

        return postObject;
      })
    );
    if (!user.nsfw) {
      postInfoArray = postInfoArray.filter((post) => post && !post.isNsfw);
    }
    res.status(200).json({ posts: postInfoArray });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

function scheduleScheduledPost(post, scheduledDate) {
  const [date, time] = scheduledDate.split(" ");
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");

  const scheduledDateTime = new Date(year, month - 1, day, hour, minute);
  const job = schedule.scheduleJob(scheduledDateTime, async () => {
    try {
      post.isScheduled = false;
      await post.save();
    } catch (error) {
      console.error(`Error scheduling post ${post._id}:`, error);
    }
  });

  return job;
}

exports.createPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User ID is invalid" });
    }
    const communityName = req.body.community;
    if (communityName) {
      const banInfo = await BanUser.findOne({ userId, communityName });
      if (banInfo) {
        return res
          .status(403)
          .json({ error: "You are banned from posting in this community" });
      }
    }
    const globalBan = await BanUser.findOne({ userId });
    if (globalBan) {
      return res
        .status(403)
        .json({ error: "You are globally banned and cannot create posts" });
    }
    const {
      title,
      content,
      community,
      type,
      pollOptions,
      pollVotingLength,
      fileType,
      link,
      isSpoiler,
      isNsfw,
      sendPostReplyNotification,
      scheduledDate,
    } = req.body;
    const isModerator = await Moderator.findOne({
      username: req.user.username,
      communityName: community,
    });
    if (scheduledDate && !isModerator) {
      return res
        .status(400)
        .json({ error: "only moderators can make scheduled posts" });
    }
    let pollExpiration, isPollEnabled;
    const communitySettings = await Community.findOne({
      name: community,
    }).select("settings");
    if (communitySettings) {
      const postTypeOptions = communitySettings.settings.postTypeOptions;
      const isSpoilerEnabled = communitySettings.settings.spoilerEnabled;
      const isMultipleImagesPerPostAllowed =
        communitySettings.settings.multipleImagesPerPostAllowed;
      const isPollsAllowed = communitySettings.settings.pollsAllowed;

      if (postTypeOptions === "links only" && type !== "Link") {
        return res
          .status(400)
          .json({ error: "This community allows only link posts" });
      } else if (postTypeOptions === "text posts only" && type !== "Post") {
        return res
          .status(400)
          .json({ error: "This community allows only text posts" });
      }
      if (!isSpoilerEnabled && isSpoiler) {
        return res
          .status(400)
          .json({ error: "This community does not allow spoiler posts" });
      }
      if (
        !isMultipleImagesPerPostAllowed &&
        fileType === "image" &&
        req.files &&
        req.files.length > 1
      ) {
        return res.status(400).json({
          error: "This community does not allow multiple images per post",
        });
      }
      if (!isPollsAllowed && type === "Poll") {
        return res
          .status(400)
          .json({ error: "This community does not allow polls" });
      }
    }
    if (!title || !community) {
      return res.status(400).json({
        error: "Invalid post data. Please provide title and community",
      });
    }
    let attachments = [];
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const result = await uploadMedia(req.files[i], fileType);
        const url = result.secure_url;
        const attachmentObj = { type: fileType, link: url };
        attachments.push(attachmentObj);
      }
    }
    if (type === "Poll") {
      if (pollVotingLength) {
        const days = parseInt(pollVotingLength.split(" ")[0]);
        if (!isNaN(days)) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + days);
          pollExpiration = expirationDate;

          // Schedule the post to disable poll after expiration
          schedule.scheduleJob(pollExpiration, async () => {
            newPost.isPollEnabled = false;
            await newPost.save();
          });
        }
      }
      isPollEnabled = 1;
    }
    if (type === "Post") {
      if (pollOptions || pollVotingLength) {
        return res.status(400).json({
          error: "Regular posts cannot have poll options, pollVotingLength",
        });
      }
    } else if (type === "Images & Video") {
      if (!attachments || attachments.length === 0 || !fileType) {
        return res.status(400).json({
          error: "fileType and files are required for image & video posts",
        });
      }
      if (pollOptions || pollVotingLength || link || content) {
        return res.status(400).json({
          error:
            "Image/video posts cannot have poll options, poll voting length, link, or content",
        });
      }
    } else if (type === "Link") {
      if (!link) {
        return res
          .status(400)
          .json({ error: "link are required for link posts" });
      }
      if (
        (attachments && attachments.length > 0) ||
        pollOptions ||
        pollVotingLength ||
        content
      ) {
        return res.status(400).json({
          error:
            "Link posts cannot have attachments, poll options, poll voting length, or content",
        });
      }
    } else if (type === "Poll") {
      if (!pollOptions || !pollVotingLength) {
        return res.status(400).json({
          error:
            " poll options, and pollVotingLength are required for poll posts",
        });
      }
    }
    if (
      type != "Post" &&
      type != "Images & Video" &&
      type != "Link" &&
      type != "Poll"
    ) {
      return res
        .status(400)
        .json({ error: "Invalid post data. Please provide real post type" });
    }
    const communityExists = await Community.findOne({ name: community });
    if (!communityExists) {
      return res.status(404).json({ message: "Community not found" });
    }
    let isApproved = false;

    if (communityExists.communityType === "Public") {
      isApproved = true;
    } else {
      if (!communityExists.contributors.includes(userId)) {
        return res.status(403).json({
          error: "User is not authorized to create posts in this community",
        });
      } else {
        isApproved = false;
      }
    }
    const newPost = new Post({
      userId,
      username: user.username,
      userProfilePic: user.avatar || "null",
      title,
      content,
      community,
      type,
      pollOptions,
      pollExpiration,
      isPollEnabled,
      pollVotingLength,
      link,
      attachments,
      isSpoiler,
      isNsfw,
      sendPostReplyNotification,
      isApproved,
      isScheduled: !!scheduledDate,
      date: scheduledDate || new Date(),
    });
    if (scheduledDate) {
      await newPost.save();
      const job = scheduleScheduledPost(newPost, scheduledDate);
      newPost.scheduledJobId = job.id;
      return res.status(201).json({
        message: "Post scheduled successfully",
        postId: newPost._id,
      });
    } else {
      await newPost.save();
      return res.status(201).json({
        message: "Post created successfully",
        postId: newPost._id,
      });
    }
  } catch (err) {
    console.error("Error creating post:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllPostsInCommunity = async (req, res) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user._id;
    const community = req.params.community;

    if (!community) {
      return res.status(400).json({ error: "Community name is required" });
    }

    const communityExists = await Community.findOne({ name: community });

    if (!communityExists) {
      return res.status(404).json({ message: "Community not found" });
    }

    let posts;

    const isModeratorOrCreator =
      communityExists.moderators.includes(userId) ||
      userId.equals(communityExists.creator);

    if (isModeratorOrCreator) {
      posts = await Post.find({ community });
    } else {
      posts = await Post.find({ community, isApproved: true });
    }

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ error: "Posts not found in the specified community" });
    }

    const postInfoArray = await Promise.all(
      posts.map(async (post) => {
        if (post.isRemoved || post.isSpam) {
          return null;
        }

        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);
    res.status(200).json({ posts: filteredPostInfoArray });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.savePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }
    const userId = req.user._id;
    if (!postId || !userId) {
      return res
        .status(400)
        .json({ error: "Post ID and User ID are required" });
    }

    let post;
    try {
      post = await Post.findById(postId);
    } catch (err) {
      if (err instanceof mongoose.CastError) {
        return res.status(404).json({ error: "Post not found" });
      }
      throw err;
    }
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.savedPosts.includes(postId)) {
      return res.status(400).json({ error: "Post already saved by the user" });
    }

    user.savedPosts.push(postId);
    await user.save();

    return res.status(200).json({ message: "Post saved successfully" });
  } catch (err) {
    console.error("Error saving post:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSavedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const savedPostIds = user.savedPosts;

    const savedPosts = await Post.find({ _id: { $in: savedPostIds } });

    if (!savedPosts || savedPosts.length === 0) {
      return res.status(404).json({ error: "Saved posts not found" });
    }

    const postInfoArray = await Promise.all(
      savedPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );
    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);
    res.status(200).json({ posts: filteredPostInfoArray });
  } catch (err) {
    console.error("Error fetching saved posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.unsavePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }
    const userId = req.user._id;
    if (!postId || !userId) {
      return res
        .status(400)
        .json({ error: "Post ID and User ID are required" });
    }
    let post;
    try {
      post = await Post.findById(postId);
    } catch (err) {
      if (err instanceof mongoose.CastError) {
        return res.status(404).json({ error: "Post not found" });
      }
      throw err;
    }
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const index = user.savedPosts.indexOf(postId);
    if (index === -1) {
      return res.status(400).json({ error: "Post is not saved by the user" });
    }

    user.savedPosts.splice(index, 1);
    await user.save();

    return res.status(200).json({ message: "Post unsaved successfully" });
  } catch (err) {
    console.error("Error unsaving post:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }
    const userId = req.user._id;
    const content = req.body.content;
    if (!postId || !userId) {
      return res
        .status(400)
        .json({ error: "Post ID and User ID are required" });
    }
    const post = await Post.findById(postId);
    const type = post.type;
    const postContent = post.content;
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "User is not authorized to edit this post" });
    }
    if (type !== "Post" && type !== "Poll") {
      return res.status(400).json({
        error: "Invalid post type. Only Post or Poll types can be edited",
      });
    }
    if (type === "Post" && (!postContent || postContent.length === 0)) {
      return res
        .status(400)
        .json({ error: "only posts with content can be editited" });
    }
    if (content) post.content.push(content);

    await post.save();

    return res.status(200).json({ message: "Post edited successfully" });
  } catch (err) {
    console.error("Error editing post:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.spoilerPostContent = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isModerator = await isModeratorOrCreator(userId, post.community);
    if (!isModerator) {
      return res.status(402).json({ message: "Not a moderator" });
    }
    const hasPermission = await checkPermission(
      req.user.username,
      post.community
    );
    if (!hasPermission) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }
    post.isSpoiler = true;
    await post.save();
    return res
      .status(200)
      .json({ message: "Post content blurred successfully" });
  } catch (error) {
    console.error("Error spoiling post content:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.unspoilerPostContent = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isModerator = await isModeratorOrCreator(userId, post.community);
    if (!isModerator) {
      return res.status(402).json({ message: "Not a moderator" });
    }
    const hasPermission = await checkPermission(
      req.user.username,
      post.community
    );
    if (!hasPermission) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }

    post.isSpoiler = false;
    await post.save();
    return res
      .status(200)
      .json({ message: "Post content unblurred successfully" });
  } catch (error) {
    console.error("Error unspoiling post content:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.lockPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isModerator = await isModeratorOrCreator(userId, post.community);
    if (!isModerator) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const hasPermission = await checkPermission(
      req.user.username,
      post.community
    );
    if (!hasPermission) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }

    post.isCommentsLocked = true;
    await post.save();
    return res
      .status(200)
      .json({ message: "Post comments locked successfully" });
  } catch (error) {
    console.error("Error locking post comments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.unlockPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isModerator = await isModeratorOrCreator(userId, post.community);
    if (!isModerator) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const hasPermission = await checkPermission(
      req.user.username,
      post.community
    );
    if (!hasPermission) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }

    post.isCommentsLocked = false;
    await post.save();
    return res
      .status(200)
      .json({ message: "Post comments unlocked successfully" });
  } catch (error) {
    console.error("Error unlocking post comments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.upvotePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }
    const user = req.user;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    userWhoCreatedPost = await User.findById(post.userId);
    if (!post) {
      return res.status(404).send({
        message: "post not found",
      });
    }
    let userUpVote = true;
    const samePerson =
      userWhoCreatedPost._id.toString() === user._id.toString();
    const downvotesCount = post.downVotes.length;

    const downvoteIndex = post.downVotes.indexOf(userId);
    const upvoteIndex = post.upVotes.indexOf(userId);
    if (downvoteIndex !== -1) {
      post.downVotes.splice(downvoteIndex, 1);
      post.upVotes.push(userId);
    } else if (upvoteIndex !== -1) {
      post.upVotes.splice(downvoteIndex, 1);
      userUpVote = false;
    } else {
      post.upVotes.push(userId);
    }

    await post.save();
    const upvotesCount = post.upVotes.length;
    const newdownvotesCount = post.downVotes.length;
    const netVotes = upvotesCount - newdownvotesCount;
    const community = await Community.findOne({ name: post.community });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (samePerson) {
      return res.status(200).json({
        votes: netVotes,
        message:
          "Post upvoted successfully, but notifications are disabled for same person",
      });
    }
    if (!userUpVote) {
      return res.status(200).json({
        votes: netVotes,
        message:
          "Post upvoted successfully, but no notifications because it is downvote",
      });
    }
    if (
      userWhoCreatedPost &&
      userWhoCreatedPost.disabledCommunities.includes(community._id)
    ) {
      return res.status(200).json({
        votes: netVotes,
        message:
          "Post upvoted successfully, but notifications are disabled for this community",
      });
    }
    //notification
    if (userUpVote && userWhoCreatedPost && userWhoCreatedPost.upvotesPosts) {
      await Notification.sendNotification(
        post.userId,
        "You have recieved a new notification",
        `${req.user.username} upvoted your post`
      );
      const notification = new Notification({
        userId: post.userId,
        content: `${req.user.username} upvoted your post`,
        relatedUserId: req.user._id,
        notificationTypeId: NotificationType.upvotePosts._id,
        postId: post._id,
      });
      await notification.save();
    }
    res.status(200).send({
      votes: netVotes,
      message: "post has been upvoted successfully",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.downvotePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send({
        message: "post not found",
      });
    }
    const upvotesCount = post.upVotes.length;

    const downvoteIndex = post.downVotes.indexOf(userId);
    const upvoteIndex = post.upVotes.indexOf(userId);
    if (downvoteIndex !== -1) {
      post.downVotes.splice(downvoteIndex, 1);
    } else if (upvoteIndex !== -1) {
      post.upVotes.splice(upvoteIndex, 1);
      post.downVotes.push(userId);
    } else {
      post.downVotes.push(userId);
    }

    await post.save();
    const downvotesCount = post.downVotes.length;
    const newupvotesCount = post.upVotes.length;
    const netVotes = newupvotesCount - downvotesCount;

    res.status(200).send({
      votes: netVotes,
      message: "post has been downvoted successfully",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.getUpvotedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ upVotes: userId });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "Posts not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const postInfoArray = await Promise.all(
      posts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({ posts: filteredPostInfoArray });
  } catch (err) {
    console.error("Error fetching upvoted posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDownvotedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ downVotes: userId });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "Posts not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const postInfoArray = await Promise.all(
      posts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({ posts: filteredPostInfoArray });
  } catch (err) {
    console.error("Error fetching downvoted posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }
    const userId = req.user._id;
    const adminId = await UserRole.find({
      name: "Admin",
    }).select("_id");
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (
      post.userId.toString() !== userId.toString() &&
      adminId[0]._id.toString() !== req.user.roleId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }
    await Post.findByIdAndDelete({ _id: postId, userId });
    await deleteComments(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

async function deleteComments(postId) {
  const comments = await Comment.find({ postId });
  await Comment.deleteMany({ postId });
  for (const comment of comments) {
    await deleteReplies(comment._id);
  }
}

async function deleteReplies(commentId) {
  const replies = await Comment.find({ parentCommentId: commentId });
  if (replies.length === 0) {
    return;
  }
  await Comment.deleteMany({ parentCommentId: commentId });
  for (const reply of replies) {
    await deleteReplies(reply._id);
  }
}

exports.hidePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.hiddenBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Post is already hidden by the user" });
    }
    post.hiddenBy.push(userId);
    await post.save();

    const user = await User.findById(userId);
    user.hiddenPosts.push(postId);
    await user.save();

    return res.status(200).json({ message: "Post hidden successfully" });
  } catch (error) {
    console.error("Error hiding post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.unhidePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const index = post.hiddenBy.indexOf(userId);
    if (index === -1) {
      return res
        .status(400)
        .json({ message: "Post is not hidden by the user" });
    }
    post.hiddenBy.splice(index, 1);
    await post.save();

    const user = await User.findById(userId);
    const postIndex = user.hiddenPosts.indexOf(postId);
    if (postIndex !== -1) {
      user.hiddenPosts.splice(postIndex, 1);
      await user.save();
    }

    return res.status(200).json({ message: "Post unhidden successfully" });
  } catch (error) {
    console.error("Error unhiding post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getHiddenPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("hiddenPosts");
    if (!user || !user.hiddenPosts || user.hiddenPosts.length === 0) {
      return res.status(404).json({ message: "No hidden posts found" });
    }

    const hiddenPosts = user.hiddenPosts;
    const postInfoArray = await Promise.all(
      hiddenPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId, true);
        return postObject;
      })
    );

    res.status(200).json({ posts: postInfoArray });
  } catch (error) {
    console.error("Error fetching hidden posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.markPostAsNsfw = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isModerator = await isModeratorOrCreator(userId, post.community);
    if (!isModerator) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const hasPermission = await checkPermission(
      req.user.username,
      post.community
    );
    if (!hasPermission) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }

    await Post.findByIdAndUpdate(postId, { isNsfw: true });
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.markPostAsNotNsfw = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  if (!postId || postId.length !== 24) {
    return res.status(404).json({ message: "Post not found" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isModerator = await isModeratorOrCreator(userId, post.community);
    if (!isModerator) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const hasPermission = await checkPermission(
      req.user.username,
      post.community
    );
    if (!hasPermission) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }

    await Post.findByIdAndUpdate(postId, { isNsfw: false });
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.reportPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }
    const { reason, subreason } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({
        message: "post not found",
      });
    }

    if (!reason) {
      return res.status(400).send({
        message: "invalid report data must send reason",
      });
    }

    const report = new Report({
      userId: userId,
      postId: postId,
      reason: reason,
      subreason: subreason,
    });

    await report.save();

    res.status(201).send({
      message: "post reported successfully",
    });
  } catch (error) {
    console.error("Error reporting post:", error);
    res.status(500).send({
      error: "An error occurred while reporting the post",
    });
  }
};

exports.voteInPoll = async (req, res) => {
  try {
    const postId = req.params.postId;
    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }
    const { selectedOption } = req.body;

    const userId = req.user._id;
    if (!postId || !selectedOption) {
      return res
        .status(400)
        .json({ error: "Post ID and selected option are required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.type !== "Poll") {
      return res
        .status(400)
        .json({ error: "The specified post is not a poll" });
    }

    if (post.votedUsers.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have already voted in this poll" });
    }

    const optionIndex = post.pollOptions.findIndex(
      (option) => option.option === selectedOption
    );
    if (optionIndex === -1) {
      return res
        .status(404)
        .json({ error: "Selected option not found in the poll" });
    }

    post.pollOptions[optionIndex].votes++;
    post.votedUsers.push(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.selectedPollOption = selectedOption;
    await user.save();
    await post.save();

    return res.status(200).json({ message: "Vote cast successfully" });
  } catch (err) {
    console.error("Error casting vote:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getReportedPostsInCommunity = async (req, res) => {
  try {
    const { communityName } = req.params;
    const userId = req.user._id;

    const isModerator = await isModeratorOrCreator(userId, communityName);
    if (!isModerator) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const hasPermission = await checkPermission(
      req.user.username,
      communityName
    );
    if (!hasPermission) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }

    const reportedPosts = await Report.find({
      postId: { $exists: true },
    }).populate("postId");

    if (!reportedPosts || reportedPosts.length === 0) {
      return res
        .status(404)
        .json({ message: "No reported posts found in the community" });
    }

    res.status(200).json({ posts: reportedPosts });
  } catch (error) {
    console.error("Error fetching reported posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
