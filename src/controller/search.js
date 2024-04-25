const Post = require("../models/post");
const Comment = require("../models/comment.js");
const User = require("../models/user");
const Report = require("../models/report.js");
const Community = require("../models/community.js");
const mongoose = require("mongoose");
const listingController = require("../controller/listing-controller");

const jwt = require("jsonwebtoken");

function calculateHotnessScore(post) {
    const ageInHours = post.date.getTime() / (1000 * 3600);
    const upvotes = post.upVotes.length;
    const downvotes = post.downVotes.length;

    const upvoteWeight = 1;
    const downvoteWeight = -1;
    const ageWeight = 0.2;

    return (
        upvotes * upvoteWeight + downvotes * downvoteWeight + ageInHours * ageWeight
    );
}

const sortPostHot = async (posts) => {
    const postsWithScores = posts.map((post) => ({
        ...post.toObject(),
        hotnessScore: calculateHotnessScore(post),
    }));
    return postsWithScores.sort((a, b) => b.hotnessScore - a.hotnessScore);
};

const sortPostNew = async (posts) => {
    return posts.sort((a, b) => b.date - a.date);
};

const sortPostTop = async (posts) => {
    return posts.sort((a, b) => {
        return (
            b.upVotes.length -
            b.downVotes.length -
            (a.upVotes.length - a.downVotes.length)
        );
    });
};

const sortPostComment = async (posts) => {
    return posts.sort((a, b) => b.commentsCount - a.commentsCount);
};

const sortCommentsNew = async (comments) => {
    return comments.sort((a, b) => b.timestamps - a.timestamps);
};

const sortCommentsTop = async (comments) => {
    return comments.sort((a, b) => {
        return (
            b.upVotes.length -
            b.downVotes.length -
            (a.upVotes.length - a.downVotes.length)
        );
    });
};


const filterUsers = (users, query) => {
    const exactMatch = [];
    const startsWithQuery = [];
    const containsQuery = [];
    users.forEach(user => {
        if (user.username.toLowerCase() === query.toLowerCase()) {
            exactMatch.push(user);
        } else if (user.username.toLowerCase().startsWith(query.toLowerCase())) {
            startsWithQuery.push(user);
        } else {
            containsQuery.push(user);
        }
    });

    return [...exactMatch, ...startsWithQuery, ...containsQuery];
};

const filterPosts = (posts, query) => {
    const exactMatch = [];
    const startsWith = [];
    const contains = [];

    posts.forEach(post => {
        post.numberOfViews++;
        post.save();
        if (post.title.toLowerCase() === query.toLowerCase()) {
            exactMatch.push(post);
        } else if (post.title.toLowerCase().startsWith(query.toLowerCase())) {
            startsWith.push(post);
        } else {
            contains.push(post);
        }
    });
    const sortedPosts = exactMatch.concat(startsWith).concat(contains);

    return sortedPosts;
};

const filterComments = (comments, query) => {
    const exactMatch = [];
    const startsWith = [];
    const contains = [];

    comments.forEach(comment => {
        if (comment.content.toLowerCase() === query.toLowerCase()) {
            exactMatch.push(comment);
        } else if (comment.content.toLowerCase().startsWith(query.toLowerCase())) {
            startsWith.push(comment);
        } else {
            contains.push(comment);
        }
    });

    const sortedComments = exactMatch.concat(startsWith).concat(contains);

    return sortedComments;
};

const filterCommunities = (communities, query) => {
    const exactMatch = [];
    const startsWith = [];
    const contains = [];

    communities.forEach(community => {
        if (community.name.toLowerCase() === query.toLowerCase()) {
            exactMatch.push(community);
        } else if (community.name.toLowerCase().startsWith(query.toLowerCase())) {
            startsWith.push(community);
        } else {
            contains.push(community);
        }
    });
    const sortedCommunities = exactMatch.concat(startsWith).concat(contains);

    return sortedCommunities;
};

exports.getSearch = async (req, res) => {
    try {
        const { q, type, sort } = req.query;
        if (!q || !type) {
            return res.status(400).json({ error: 'Invalid search query or type' });
        }
        if (type === 'people') {
            const users = await User.find({
                $or: [
                    { username: q },
                    { username: { $regex: `^${q}`, $options: 'i' } },
                    { username: { $regex: q, $options: 'i' } }
                ]
            });

            const sortedUsers = filterUsers(users, q);
            return res.status(200).json({ results: sortedUsers });
        } else if (type === 'posts') {
            let posts = await Post.find({ title: { $regex: q, $options: 'i' } });
            const sortedPosts = filterPosts(posts, q);
            if (sort === 'hot') {
                posts = await sortPostHot(sortedPosts);
            } else if (sort === 'new') {
                posts = await sortPostNew(sortedPosts);
            } else if (sort === 'top') {
                posts = await sortPostTop(sortedPosts);
            } else if (sort === 'comment') {
                posts = await sortPostComment(sortedPosts);
            }
            else {
                posts = sortedPosts;
            }
            return res.status(200).json({ results: posts });
        } else if (type === 'comments') {
            let comments = await Comment.find({ content: { $regex: q, $options: 'i' } });
            const sortedComments = filterComments(comments, q);
            if (sort === 'new') {
                comments = await sortCommentsNew(sortedComments);
            } else if (sort === 'top') {
                comments = await sortCommentsTop(sortedComments);
            }
            else {
                comments = sortedComments;
            }
            return res.status(200).json({ results: comments });
        } else if (type === 'communities') {
            const communities = await Community.find({ name: { $regex: q, $options: 'i' } });
            const sortedCommunities = filterCommunities(communities, q);
            return res.status(200).json({ results: sortedCommunities });
        } else if (type === 'hashtags') {
            // Search for hashtags
            // Implement your logic here
        } else {
            return res.status(400).json({ error: 'Invalid search type' });
        }

    } catch (err) {
        console.error('Error occurred during search:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}