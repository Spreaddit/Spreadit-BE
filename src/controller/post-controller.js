const Post = require('../models/post');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        if (posts.length === 0) {
            return res.status(404).json({ error: 'Posts not found' });
        }
        for (let post of posts) {
            post = await Post.findById(post._id);
            post.numberOfViews++;
            await post.save();
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllUserPosts = async (req, res) => {
    try {
        const token = req.params.userId;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        if (!decodeToken || !decodeToken._id) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const userId = decodeToken._id;

        const posts = await Post.find({ userId });

        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: 'User or posts not found' });
        }
        for (let post of posts) {
            post = await Post.findById(post._id);
            post.numberOfViews++;
            await post.save();
        }
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createPost = async (req, res) => {
    try {
        const token = req.params.userId;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const decodeToken = jwt.decode(token);
        if (!decodeToken || !decodeToken._id) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const userId = decodeToken._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User ID is invalid' });
        }
        const { title, content, community, type, pollOptions, link, imageOrVideo, isSpoiler, isNsfw, sendPostReplyNotification } = req.body;

        if (!title || !community) {
            return res.status(400).json({ error: 'Invalid post data. Please provide title and community' });
        }

        if (!user.communities.includes(community)) {
            return res.status(400).json({ error: 'You can only choose communities that you have already joined' });
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
            link,
            imageOrVideo,
            isSpoiler,
            isNsfw,
            sendPostReplyNotification
        });
        await newPost.save();
        return res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
        console.error('Error creating post:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
