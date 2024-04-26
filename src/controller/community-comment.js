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
