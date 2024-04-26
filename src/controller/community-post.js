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

exports.spamPost = async (req, res) => {
    try {
        const communityName = req.params.communityName;
        const postId = req.params.postId;
        const moderatorId = req.user._id;

        if (!moderatorId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const isModerator = await isModeratorOrCreator(moderatorId, communityName);
        if (!isModerator) {
            return res.status(402).json({ message: "Not a moderator" });
        }
        const hasPermission = await checkPermission(moderatorId, postId);
        if (!hasPermission) {
            return res.status(406).json({ message: "Moderator doesn't have permission" });
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
    const isModerator = community.moderators.some(moderatorId => moderatorId.equals(userId));
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
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const isModerator = await Moderator.findOne({ username: req.user.username, communityName });
        if (!isModerator || !(await checkPermission(req.user.username, communityName))) {
            return res.status(402).json({ message: "Not a moderator or does not have permission" });
        }
        const spamPosts = await Post.find({ community: communityName, isSpam: true });
        res.status(200).json({ spamPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};