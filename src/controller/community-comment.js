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
        const postId = req.params.postId;
        const moderatorId = req.user._id;
        const commentId = req.params.commentId;

        const isModerator = await isModeratorOrCreator(moderatorId, communityName);
        if (!isModerator) {
            return res.status(402).json({ message: "Not a moderator" });
        }
        const hasPermission = await checkPermission(moderatorId, postId);
        if (!hasPermission) {
            return res.status(406).json({ message: "Moderator doesn't have permission" });
        }
        const comment = await Comment.findByIdAndUpdate(commentId, { isSpam: true });
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
    const isModerator = community.moderators.some(moderatorId => moderatorId.equals(userId));
    if (isModerator) {
        return true;
    }

    return false;
}


async function checkPermission(username, communityName) {
    const moderator = await Moderator.findOne({ username, communityName });
    console.log(moderator);
    if (!moderator) {
        return false;
    }

    return moderator.managePostsAndComments === true;
}

exports.getSpamComments = async (req, res) => {
    try {
        const { communityName } = req.params;
        const isModerator = await Moderator.findOne({ username: req.user.username, communityName });
        if (!isModerator || !(await checkPermission(req.user.username, communityName))) {
            return res.status(402).json({ message: "Not a moderator or does not have permission" });
        }
        const spamComments = await Post.find({ community: communityName, isSpam: true });
        const generatedComments = []
        for (const spamComment of spamComments) {
            const generatedComment = await Comment.getCommentObject(spamComment);
            generatedComments.push(generatedComment);
        }
        res.status(200).json({ generatedComments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.addRemovalReasonPosts = async (req, res) => {
    try {
        const { communityName, postId } = req.params;

        const spamPost = await Post.findOne({ _id: postId, community: communityName, isSpam: true });
        if (!spamPost) {
            return res.status(404).json({ message: "Post not found or not marked as spam" });
        }
        const isModerator = await Moderator.findOne({ username: req.user.username, communityName });
        if (!isModerator || !(await checkPermission(req.user.username, communityName))) {
            return res.status(402).json({ message: "Not a moderator or does not have permission" });
        }
        const { removalReason } = req.body;
        if (!removalReason) {
            return res.status(400).json({ message: "must enter removal reason" });
        }
        spamPost.removalReason = removalReason;
        await spamPost.save();
        res.status(200).json({ message: "Removal reason added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.lockPost = async (req, res) => {
    try {
        const { communityName, postId } = req.params;
        if (!postId || postId.length !== 24) {
            return res.status(404).json({ message: "Post not found" });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const isModerator = await Moderator.findOne({ username: req.user.username, communityName });
        if (!isModerator || !(await checkPermission(req.user.username, communityName))) {
            return res.status(402).json({ message: "Not a moderator or does not have permission" });
        }

        if (post.isCommentsLocked) {
            return res.status(403).json({ message: "Post is already locked" });
        }

        post.isCommentsLocked = true;
        await post.save();
        return res.status(200).json({ message: "Post locked successfully" });
    } catch (error) {
        console.error("Error locking post:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.unlockPost = async (req, res) => {
    try {
        const { communityName, postId } = req.params;
        if (!postId || postId.length !== 24) {
            return res.status(404).json({ message: "Post not found" });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const isModerator = await Moderator.findOne({ username: req.user.username, communityName });
        if (!isModerator || !(await checkPermission(req.user.username, communityName))) {
            return res.status(402).json({ message: "Not a moderator or does not have permission" });
        }

        if (!post.isCommentsLocked) {
            return res.status(403).json({ message: "Post is not locked" });
        }

        post.isCommentsLocked = false;
        await post.save();
        return res.status(200).json({ message: "Post unlocked successfully" });
    } catch (error) {
        console.error("Error unlocking post:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.removePost = async (req, res) => {
    try {
        const { communityName, postId } = req.params;

        if (!postId || postId.length !== 24) {
            return res.status(404).json({ message: "Post not found" });
        }
        const isModerator = await Moderator.findOne({ username: req.user.username, communityName });
        if (!isModerator || !(await checkPermission(req.user.username, communityName))) {
            return res.status(402).json({ message: "Not a moderator or does not have permission" });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        await post.delete();
        return res.status(200).json({ message: "Post removed successfully" });
    } catch (error) {
        console.error("Error removing post:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
