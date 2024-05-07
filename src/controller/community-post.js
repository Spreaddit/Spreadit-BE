const Post = require("../models/post");
const Comment = require("../models/comment.js");
const User = require("../models/user");
const Report = require("../models/report.js");
const Community = require("../models/community.js");
const mongoose = require("mongoose");
const Moderator = require("../models/moderator.js");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
const { uploadMedia } = require("../service/cloudinary.js");
const { post } = require("../routes/community-post.js");

exports.spamPost = async (req, res) => {
  try {
    const communityName = req.params.communityName;
    const postId = req.params.postId;
    const moderatorId = req.user._id;

    const isModerator = await isModeratorOrCreator(moderatorId, communityName);
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
    const post = await Post.findByIdAndUpdate(postId, { isSpam: true });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post marked as spam successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

exports.getSpamPosts = async (req, res) => {
  try {
    const { communityName } = req.params;
    const isModerator = await Moderator.findOne({
      username: req.user.username,
      communityName,
    });
    if (
      !isModerator ||
      !(await checkPermission(req.user.username, communityName))
    ) {
      return res
        .status(402)
        .json({ message: "Not a moderator or does not have permission" });
    }
    const spamPosts = await Post.find({
      community: communityName,
      isSpam: true,
    });
    const postInfoArray = await Promise.all(
      spamPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, req.user._id);
        return postObject;
      })
    );
    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);
    res.status(200).json({ filteredPostInfoArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getEdititedPostsHistory = async (req, res) => {
  try {
    const { communityName } = req.params;
    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }
    const isModerator = await Moderator.findOne({
      username: req.user.username,
      communityName,
    });
    if (
      !isModerator ||
      !(await checkPermission(req.user.username, communityName))
    ) {
      return res
        .status(402)
        .json({ message: "Not a moderator or does not have permission" });
    }
    const editedPosts = await Post.find({
      community: communityName,
      "content.1": { $exists: true },
    });

    if (editedPosts.length === 0) {
      return res.status(404).json({ error: "Edited posts not found" });
    }
    const postInfoArray = await Promise.all(
      editedPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, req.user._id);
        return postObject;
      })
    );
    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);
    res.status(200).json(filteredPostInfoArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.removePost = async (req, res) => {
  try {
    const { communityName, postId } = req.params;
    const removalReason = req.body.removalReason;

    if (!postId || postId.length !== 24) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!removalReason) {
      return res.status(400).json({ message: "Must has a removal reason" });
    }
    const isModerator = await Moderator.findOne({
      username: req.user.username,
      communityName,
    });
    if (
      !isModerator ||
      !(await checkPermission(req.user.username, communityName))
    ) {
      return res
        .status(402)
        .json({ message: "Not a moderator or does not have permission" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.isRemoved) {
      return res
        .status(403)
        .json({ error: "Post has already been removed before" });
    }
    post.isRemoved = true;
    const removalComment = new Comment({
      content: removalReason,
      userId: req.user._id,
      postId: post._id,
    });
    await removalComment.save();
    post.comments.push(removalComment._id);
    post.commentsCount = post.commentsCount + 1;
    await post.save();
    return res.status(200).json({ message: "Post removed successfully" });
  } catch (error) {
    console.error("Error removing post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUnmoderatedPosts = async (req, res) => {
  try {
    const { communityName } = req.params;
    const isModerator = await Moderator.findOne({
      username: req.user.username,
      communityName,
    });
    if (
      !isModerator ||
      !(await checkPermission(req.user.username, communityName))
    ) {
      return res
        .status(402)
        .json({ message: "Not a moderator or does not have permission" });
    }
    const unmoderatedPosts = await Post.find({
      community: communityName,
      isApproved: false,
    });

    if (!unmoderatedPosts || unmoderatedPosts.length === 0) {
      return res.status(404).json({ message: "No unmoderated posts found" });
    }
    const postInfoArray = await Promise.all(
      unmoderatedPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, req.user._id);
        return postObject;
      })
    );
    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);
    res.status(200).json(filteredPostInfoArray);
  } catch (error) {
    console.error("Error retrieving unmoderated posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getScheduledPosts = async (req, res) => {
  try {
    const { communityName } = req.params;
    const isModerator = await Moderator.findOne({
      username: req.user.username,
      communityName,
    });
    if (
      !isModerator ||
      !(await checkPermission(req.user.username, communityName))
    ) {
      return res
        .status(402)
        .json({ message: "Not a moderator or does not have permission" });
    }

    const scheduledPosts = await Post.find({
      community: communityName,
      isScheduled: true,
    });

    if (!scheduledPosts || scheduledPosts.length === 0) {
      return res.status(404).json({ message: "No scheduled posts found" });
    }
    const postInfoArray = await Promise.all(
      scheduledPosts.map(async (post) => {
        const postObject = await Post.getPostObject(
          post,
          req.user._id,
          false,
          true
        );
        return postObject;
      })
    );
    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);
    res.status(200).json(filteredPostInfoArray);
  } catch (error) {
    console.error("Error retrieving scheduled posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.approvePost = async (req, res) => {
  try {
    const { communityName, postId } = req.params;
    const isModerator = await Moderator.findOne({
      username: req.user.username,
      communityName,
    });
    if (
      !isModerator ||
      !(await checkPermission(req.user.username, communityName))
    ) {
      return res
        .status(402)
        .json({ message: "Not a moderator or does not have permission" });
    }
    const post = await Post.findOne({ _id: postId, community: communityName });
    if (!post) {
      return res.status(404).json({ message: "Post or community not found" });
    }
    post.isApproved = true;
    await post.save();

    return res.status(200).json({ message: "Post approved successfully" });
  } catch (error) {
    console.error("Error approving post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
