const Comment = require("../models/comment");
const Community = require("../models/community");
const User = require("../models/user");
const Post = require("../models/post");
const Message = require("../models/message");
const mongoose = require("mongoose");
const UserRole = require("../models/constants/userRole");
const upload = require("../service/fileUpload");
const { uploadMedia } = require("../service/cloudinary");
const config = require("./../configuration");
const Report = require("../models/report");
const Notification = require("./../models/notification");
const NotificationType = require("./../../seed-data/constants/notificationType");
require("./../models/constants/notificationType");
const Moderator = require("../models/moderator.js");

exports.createComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const { content, fileType } = req.body;
    if (!content) {
      return res.status(400).send({
        message: "Comment content is required",
      });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({
        message: "Post not found",
      });
    }
    const communityName = post.community;
    const recieverId = post.userId;
    const isModerator = await Moderator.findOne({
      username: req.user.username,
      communityName,
    });
    if (post.isCommentsLocked && !isModerator) {
      return res.status(403).send({
        message: "Comments are locked for this post",
      });
    }

    const newComment = new Comment({
      content,
      userId,
      postId,
    });

    const community = await Community.findOne({
      name: communityName,
    });
    const contributors = community.members;
    if (
      contributors.includes(userId) &&
      (community.type === "Restricted" || community.type == "Private")
    ) {
      newComment.isApproved = true;
    } else if (community.type === "Restricted" || community.type == "Private") {
      return res.status(400).send({
        message: "You are not an approved user to this community",
      });
    }

    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const result = await uploadMedia(req.files[i], fileType);
        const url = result.secure_url;
        const attachmentObj = { type: fileType, link: url };
        newComment.attachments.push(attachmentObj);
      }
    }
    await newComment.save();
    await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
    post.comments.push(newComment._id);
    await post.save();
    const commentObj = await Comment.getCommentObject(newComment, userId);

    const mentionedUsernames = content.match(/@(\S+)/g);
    if (mentionedUsernames !== null) {
      const mentionedUsers = await User.find({
        username: {
          $in: mentionedUsernames.map((username) => username.slice(1)),
        },
      });

      for (const mentionedUser of mentionedUsers) {
        if (!userId.equals(mentionedUser._id)) {
          const newMessage = new Message({
            senderId: userId,
            recieverId: mentionedUser._id,
            conversationSubject: `Mention in post comment`,
            contentType: "mention",
            content: commentObj,
          });
          await newMessage.save();
          await Notification.sendNotification(
            post.userId,
            "You have recieved a new notification",
            `${req.user.username} commented your post`
          );
          const notification = new Notification({
            userId: mentionedUser._id,
            content: `${req.user.username} mentioned you in a comment`,
            relatedUserId: req.user._id,
            notificationTypeId: NotificationType.mention._id,
            postId: post._id,
            commentId: newComment._id,
          });
          await notification.save();
        }
      }
    }

    //notification
    userWhoCreatedPost = await User.findById(post.userId);
    if (
      !post.userId.equals(req.user._id) &&
      userWhoCreatedPost.comments == true
    ) {
      await Notification.sendNotification(
        post.userId,
        "You have recieved a new notification",
        `${req.user.username} commented your post`
      );
      const notification = new Notification({
        userId: post.userId,
        content: `${req.user.username} commented your post`,
        relatedUserId: req.user._id,
        notificationTypeId: NotificationType.comment._id,
        postId: post._id,
        commentId: newComment._id,
      });
      await notification.save();
    }

    //message

    if (!(userId.toString() === recieverId.toString())) {
      const newMessage = new Message({
        senderId: userId,
        recieverId: recieverId,
        conversationSubject: `post reply : ${post.title}`,
        contentType: "comment",
        content: commentObj,
      });

      await newMessage.save();
    }

    res.status(201).send({
      comment: commentObj,
      message: "Comment has been added successfully",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).send({
        message: "comment not found",
      });
    }

    const adminId = await UserRole.find({
      name: "Admin",
    }).select("_id");

    if (
      comment.userId.toString() !== userId.toString() &&
      adminId[0]._id.toString() !== req.user.roleId.toString()
    ) {
      return res.status(403).send({
        message: "You are not authorized to delete this comment",
      });
    }

    if (
      adminId[0]._id.toString() === req.user.roleId.toString() ||
      comment.userId.toString() === userId.toString()
    ) {
      await Comment.deleteMany({ parentCommentId: req.params.commentId });
      const post = await Post.findOneAndUpdate(
        { _id: comment.postId },
        { $inc: { commentsCount: -1 } },
        { new: true }
      );

      await Comment.findByIdAndDelete(commentId);

      const commentObj = await Comment.getCommentObject(comment, userId);

      res.status(200).send({
        comment: commentObj,
        message: "comment deleted successfully",
      });
    }
  } catch {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.getCommentByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    let comments;
    if (postId) {
      comments = await Comment.find({ postId }).populate({
        path: "userId",
      });
    } else {
      comments = await Comment.find().populate({
        path: "userId",
      });
    }

    if (!comments || comments.length === 0) {
      return res.status(404).send({
        message: "No comments found for the given post Id",
      });
    }

    const commentObjects = [];
    for (const comment of comments) {
      const commentObject = await Comment.getCommentObject(
        comment,
        req.user._id,
        true
      );
      if (req.query.include_replies === "true") {
        const commentWithReplies = await Comment.getCommentReplies(
          commentObject,
          req.user._id,
          true
        );
        commentObject.replies = commentWithReplies.replies;
      }
      commentObjects.push(commentObject);
    }
    res.status(200).send({
      comments: commentObjects,
      message: "Comments have been retrieved successfully",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.getCommentByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.getUserByEmailOrUsername(username);
    const userId = user._id;
    const comments = await Comment.find({ userId }).populate({
      path: "userId",
    });

    if (!comments || comments.length === 0) {
      return res.status(404).send({
        message: "No comments found for the user",
      });
    }

    const commentObjects = [];
    for (const comment of comments) {
      const commentObject = await Comment.getCommentObject(
        comment,
        req.user._id
      );
      commentObjects.push(commentObject);
    }

    res.status(200).send({
      comments: commentObjects,
      message: "Comments for the user have been retrieved successfully",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.getCommentSaved = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("savedComments");

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const savedComments = user.savedComments;
    if (!savedComments || savedComments.length === 0) {
      return res.status(404).send({
        message: "No saved comments found for the user",
      });
    }

    const commentObjects = [];
    for (const comment of savedComments) {
      const commentObject = await Comment.getCommentObject(
        comment,
        req.user._id,
        true
      );
      if (req.query.include_replies === "true") {
        const commentWithReplies = await Comment.getCommentReplies(
          commentObject,
          req.user.username
        );
        commentObject.replies = commentWithReplies.replies;
      }
      commentObjects.push(commentObject);
    }

    res.status(200).send({
      comments: commentObjects,
      message: "Saved Comments for the user have been retrieved successfully",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.editComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).send({
        message: "Updated content is required",
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }

    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).send({
        message: "You are not authorized to edit this comment",
      });
    }

    comment.lastEdit = comment.content;
    comment.content = content;
    comment.isEdited = true;
    await comment.save();
    res.status(200).send({
      message: "Comment has been updated successfully",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.createReply = async (req, res) => {
  try {
    const parentCommentId = req.params.parentCommentId;
    const userId = req.user._id;
    const { content, fileType } = req.body;
    if (!content) {
      return res.status(400).send({
        message: "Reply content is required",
      });
    }

    const existingComment = await Comment.findById(parentCommentId);

    if (!existingComment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }
    const rootComment = await Comment.findRootComment(parentCommentId);

    if (!rootComment) {
      return res.status(404).send({
        message: "Root comment not found",
      });
    }

    const post = await Post.findById(rootComment.postId);
    const communityName = post.community;
    const isModerator = await Moderator.findOne({
      username: req.user.username,
      communityName,
    });

    if (existingComment.isLocked && !isModerator) {
      return res.status(400).send({
        message: "Comment is Locked for this comment",
      });
    }

    if (post.isCommentsLocked && !isModerator) {
      return res.status(403).send({
        message: "Comments are locked for this post",
      });
    }

    const community = await Community.findOne({
      name: post.community,
    });
    const contributors = community.contributors;

    let newReply = new Comment({
      content,
      userId,
      parentCommentId,
    });

    if (
      contributors.includes(userId) &&
      (community.type === "Restricted" || community.type === "Private")
    ) {
      newReply.isApproved = true;
    }

    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const result = await uploadMedia(req.files[i], fileType);
        const url = result.secure_url;
        const attachmentObj = { type: fileType, link: url };
        newReply.attachments.push(attachmentObj);
      }
    }

    await newReply.save();

    await Comment.findByIdAndUpdate(parentCommentId, {
      $inc: { repliesCount: 1 },
    });
    await Post.findByIdAndUpdate(rootComment.postId, {
      $inc: { commentsCount: 1 },
    });
    post.comments.push(newReply._id);
    await post.save();
    const replyObj = await Comment.getCommentObject(newReply, userId);

    //notification
    userWhoCreatedComment = await User.findById(existingComment.userId);
    if (
      !existingComment.userId.equals(req.user._id) &&
      userWhoCreatedComment.comments == true
    ) {
      await Notification.sendNotification(
        existingComment.userId,
        "You have recieved a new notification",
        `${req.user.username} replied on your comment`
      );
      const notification = new Notification({
        userId: existingComment.userId,
        content: `${req.user.username} replied on your comment`,
        relatedUserId: req.user._id,
        notificationTypeId: NotificationType.commentReply._id,
        commentId: newReply._id,
      });
      await notification.save();
    }

    res.status(201).send({
      reply: replyObj,
      message: "Reply has been added successfully",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.getRepliesByCommentId = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }

    const replies = await Comment.getCommentRepliesss(comment, userId);

    res.status(200).send({
      replies,
      message: "Replies for the comment have been retrieved successfully",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.hideComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }

    const isHidden = comment.hiddenBy.includes(userId);
    if (isHidden) {
      const index = comment.hiddenBy.indexOf(userId);
      if (index > -1) {
        comment.hiddenBy.splice(index, 1);
      }
    } else {
      comment.hiddenBy.push(userId);
    }

    await comment.save();

    const user = await User.findById(userId);
    if (user) {
      const hiddenCommentsIndex = user.hiddenComments.indexOf(commentId);
      if (isHidden && hiddenCommentsIndex > -1) {
        user.hiddenComments.splice(hiddenCommentsIndex, 1);
      } else if (!isHidden && hiddenCommentsIndex === -1) {
        user.hiddenComments.push(commentId);
      }
      await user.save();
    }

    res.status(200).send({
      message: `Comment has been ${
        isHidden ? "unhidden" : "hidden"
      } successfully`,
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.upvoteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }
    const downvotesCount = comment.downVotes.length;
    const upvotesCount = comment.upVotes.length;
    let netVotes = upvotesCount - downvotesCount;

    const downvoteIndex = comment.downVotes.indexOf(userId);
    if (downvoteIndex !== -1) {
      comment.downVotes.splice(downvoteIndex, 1);
      netVotes = netVotes - 1;
      await comment.save();
    }

    if (comment.upVotes.includes(userId)) {
      const upvoteIndex = comment.upVotes.indexOf(userId);
      if (upvoteIndex !== -1) {
        comment.upVotes.splice(upvoteIndex, 1);
        await comment.save();
      }
      netVotes = netVotes - 1;
      return res.status(400).send({
        votes: netVotes,
        message: "You have removed your upvote this comment",
      });
    }

    comment.upVotes.push(userId);
    netVotes = netVotes + 1;
    await comment.save();
    userWhoCreatedComment = await User.findById(comment.userId);

    const rootComment = await Comment.findRootComment(comment._id);
    const post = await Post.findById(rootComment.postId);
    const community = await Community.findOne({ name: post.community });
    const userDisabledCommunities =
      userWhoCreatedComment.disabledCommunities.map((c) => c.toString());
    if (userDisabledCommunities.includes(community._id.toString())) {
      return res.status(200).json({
        votes: netVotes,
        message:
          "Post upvoted successfully, but notifications are disabled for this community",
      });
    }
    if (
      !comment.userId.equals(req.user._id) &&
      userWhoCreatedComment.upvotesComments == true
    ) {
      await Notification.sendNotification(
        comment.userId,
        "You have recieved a new notification",
        `${req.user.username} upvoted your comment`
      );
      const notification = new Notification({
        userId: comment.userId,
        content: `${req.user.username} upvoted your comment`,
        relatedUserId: req.user._id,
        notificationTypeId: NotificationType.upvoteComments._id,
        commentId: comment._id,
      });
      await notification.save();
    }

    res.status(200).send({
      votes: netVotes,
      message: "Comment has been upvoted successfully",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.downvoteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }
    const downvotesCount = comment.downVotes.length;
    const upvotesCount = comment.upVotes.length;
    let netVotes = upvotesCount - downvotesCount;

    const upvoteIndex = comment.upVotes.indexOf(userId);
    if (upvoteIndex !== -1) {
      comment.upVotes.splice(upvoteIndex, 1);
      netVotes = netVotes - 1;
    }

    if (comment.downVotes.includes(userId)) {
      const downvoteIndex = comment.downVotes.indexOf(userId);
      if (downvoteIndex !== -1) {
        comment.downVotes.splice(downvoteIndex, 1);
        await comment.save();
      }
      netVotes = netVotes + 1;
      return res.status(400).send({
        votes: netVotes,
        message: "You have removed your downvote this comment",
      });
    }

    netVotes = netVotes - 1;

    comment.downVotes.push(userId);
    await comment.save();

    res.status(200).send({
      votes: netVotes,
      message: "Comment has been downvoted successfully",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.saveComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const isSaved = user.savedComments.includes(commentId);

    if (isSaved) {
      const index = user.savedComments.indexOf(commentId);
      user.savedComments.splice(index, 1);
    } else {
      user.savedComments.push(commentId);
    }

    if (isSaved) {
      const index = comment.savedBy.indexOf(userId);
      comment.savedBy.splice(index, 1);
    } else {
      comment.savedBy.push(userId);
    }

    await user.save();
    await comment.save();

    if (isSaved) {
      res.status(200).send({
        message: "Comment has been unsaved successfully",
      });
    } else {
      res.status(200).send({
        message: "Comment has been saved successfully",
      });
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

exports.reportComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { reason, subreason } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }

    const report = new Report({
      userId: userId,
      postId: comment.postId,
      commentId: commentId,
      reason: reason,
      subreason: subreason,
    });

    await report.save();

    res.status(201).send({
      message: "Comment reported successfully",
    });
  } catch (error) {
    console.error("Error reporting comment:", error);
    res.status(500).send({
      error: "An error occurred while reporting the comment",
    });
  }
};
