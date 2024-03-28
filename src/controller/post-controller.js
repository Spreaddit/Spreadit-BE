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


exports.getAllPostsInCommunity = async (req, res) => {
    try {
        const community = req.params.community;
        if (!community) {
            return res.status(400).json({ error: 'Community name is required' });
        }
        const posts = await Post.find({ community });

        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: 'Posts not found in the specified community' });
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

exports.savePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const token = req.query.userId;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const decodeToken = jwt.decode(token);
        if (!decodeToken || !decodeToken._id) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const userId = decodeToken._id;
        if (!postId || !userId) {
            return res.status(400).json({ error: 'Post ID and User ID are required' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.savedPosts.includes(postId)) {
            return res.status(400).json({ error: 'Post already saved by the user' });
        }

        user.savedPosts.push(postId);
        await user.save();

        return res.status(200).json({ message: 'Post saved successfully' });
    } catch (err) {
        console.error('Error saving post:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getSavedPosts = async (req, res) => {
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
            return res.status(404).json({ error: 'User not found' });
        }

        const savedPostIds = user.savedPosts;

        const savedPosts = await Post.find({ _id: { $in: savedPostIds } });

        if (!savedPosts || savedPosts.length === 0) {
            return res.status(404).json({ error: 'Saved posts not found' });
        }

        res.status(200).json(savedPosts);
    } catch (err) {
        console.error('Error fetching saved posts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};