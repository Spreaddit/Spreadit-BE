const Post = require("../models/post");
const Comment = require("../models/comment.js");
const User = require("../models/user");
const Report = require("../models/report.js");
const Community = require("../models/community.js");
const mongoose = require("mongoose");
const Moderator = require("../models/moderator.js");

exports.spamComment = async (req, res) => {
  try {
    const communityName = req.params.communityName;
    const moderatorId = req.user._id;
    const commentId = req.params.commentId;

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
    const comment = await Comment.findByIdAndUpdate(commentId, {
      isSpam: true,
    });
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    res.status(200).json({ message: "Comment marked as spam successfully" });
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

exports.getSpamComments = async (req, res) => {
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
    const posts = await Post.find({ community: communityName });
    let spammComments = [];
    for (const post of posts) {
      const comments = await Comment.find({ postId: post._id, isSpam: true });
      for (const comment of comments) {
        const generatedComment = await Comment.getCommentObject(
          comment,
          req.user._id,
          true
        );
        spammComments.push(generatedComment);
      }
    }

    res.status(200).json({ SpammedComments: spammComments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.lockComment = async (req, res) => {
  try {
    const { communityName, commentId } = req.params;
    if (!commentId) {
      return res.status(404).json({ message: "CommentId not found" });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
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

    if (comment.isLocked) {
      return res.status(403).json({ message: "Comment is already locked" });
    }

    comment.isLocked = true;
    await comment.save();
    return res.status(200).json({ message: "Comment locked successfully" });
  } catch (error) {
    console.error("Error locking comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.unlockComment = async (req, res) => {
  try {
    const { communityName, commentId } = req.params;
    if (!commentId) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
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

    if (!comment.isLocked) {
      return res.status(403).json({ message: "Post is not locked" });
    }

    comment.isLocked = false;
    await comment.save();
    return res.status(200).json({ message: "Comment unlocked successfully" });
  } catch (error) {
    console.error("Error unlocking comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.removeComment = async (req, res) => {
  try {
    const { communityName, commentId } = req.params;
    const removalReason = req.body.removalReason;

    if (!commentId) {
      return res.status(404).json({ message: "Comment not found" });
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
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    comment.isRemoved = true;
    await comment.save();

    let removalComment = new Comment({
      content: removalReason,
      userId: req.user._id,
      parentCommentId: comment._id,
      isRemoval: true,
    });
    await removalComment.save();
    removalComment = await Comment.find({ userId: req.user._id });
    const rootComment = await Comment.findRootComment(comment._id);
    const post = await Post.findOne(rootComment.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.commentsCount = post.commentsCount + 1;
    post.comments.push(removalComment._id);

    await post.save();
    return res.status(200).json({ message: "Comment removed successfully" });
  } catch (error) {
    console.error("Error removing post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.approveComment = async (req, res) => {
  try {
    const { communityName, commentId } = req.params;

    if (!commentId) {
      return res.status(404).json({ message: "Comment not found" });
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
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    comment.isApproved = true;
    await comment.save();

    return res.status(200).json({ message: "Comment approved successfully" });
  } catch (error) {
    console.error("Error removing post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEdititedCommentsHistory = async (req, res) => {
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

    const posts = await Post.find({ community: communityName }, "_id");
    const postIds = posts.map((post) => post._id);
    const editedComments = await Comment.find({
      postId: { $in: postIds },
      isEdited: true,
    });

    if (editedComments.length === 0) {
      return res.status(404).json({ error: "Edited comments not found" });
    }

    const commentObjects = [];
    for (const comment of editedComments) {
      const commentObject = await Comment.getCommentObject(
        comment,
        req.user._id,
        true
      );
      commentObjects.push(commentObject);
    }

    return res.status(200).json({ editedComment: commentObjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getReportedComments = async (req, res) => {
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
    const posts = await Post.find({ community: communityName });
    const reportedComments = [];
    for (const post of posts) {
      const topLevelComments = await Comment.find({
        postId: post._id,
        parentCommentId: null,
        isRemoved: false,
      }).populate("userId");

      for (const topLevelComment of topLevelComments) {
        const reports = await Report.find({
          commentId: topLevelComment._id,
        }).populate("userId");

        if (reports.length > 0) {
          const topLevelCommentObject = await Comment.getCommentObject(
            topLevelComment,
            req.user._id,
            true
          );
          const reportsArray = reports.map((report) => ({
            username: report.userId.username,
            reason: report.reason,
            subreason: report.subreason,
          }));
          topLevelCommentObject.reports = reportsArray;
          reportedComments.push(topLevelCommentObject);
        }
      }
    }
    return res.status(200).json({ reportedComments: reportedComments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
