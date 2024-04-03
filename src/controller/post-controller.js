const Post = require('../models/post');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
const { uploadMedia } = require("../service/cloudinary.js");

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
        const userId = req.user._id;

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
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User ID is invalid' });
        }
        const { title, content, community, type, pollOptions, pollVotingLength, link, videos, isSpoiler, isNsfw, sendPostReplyNotification } = req.body;
        let pollExpiration, isPollEnabled;
        if (!title || !community) {
            return res.status(400).json({ error: 'Invalid post data. Please provide title and community' });
        }
        let images = [];
        if (req.files && req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                const result = await uploadMedia(req.files[i]); // Corrected accessing req.files array
                const url = result.secure_url;
                images.push(url);
            }
        }
        if (type === 'Poll') {
            if (pollVotingLength) {
                const days = parseInt(pollVotingLength.split(' ')[0]);
                if (!isNaN(days)) {
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + days);
                    pollExpiration = expirationDate;
                }
            }
            isPollEnabled = 1;
        }
        // Validate post data based on post type
        if (type === 'Post') {
            if (pollOptions || pollVotingLength) {
                return res.status(400).json({ error: 'Regular posts cannot have poll options, pollVotingLength' });
            }
        } else if (type === 'Images & Video') {
            if (!images) {
                return res.status(400).json({ error: 'images are required for image/video posts' });
            }
            if (pollOptions || pollVotingLength || link || content) {
                return res.status(400).json({ error: 'images posts cannot have poll options, pollVotingLength, link, or content' });
            }
        } else if (type === 'Link') {
            if (!link) {
                return res.status(400).json({ error: 'link are required for link posts' });
            }
            if (images.length > 0 || videos || pollOptions || pollVotingLength || content) {
                return res.status(400).json({ error: 'Link posts cannot have poll options, pollVotingLength, images, or content' });
            }
        } else if (type === 'Poll') {
            if (!pollOptions || !pollVotingLength) {
                return res.status(400).json({ error: ' poll options, and pollVotingLength are required for poll posts' });
            }
        }


        if (!user.communities.includes(community)) {
            return res.status(400).json({ error: 'You can only choose communities that you have already joined' });
        }
        if (type != 'Post' && type != 'Images & Video' && type != 'Link' && type != 'Poll') {
            return res.status(400).json({ error: 'Invalid post data. Please provide real post type' });
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
            images,
            videos,
            isSpoiler,
            isNsfw,
            sendPostReplyNotification
        });

        await newPost.save();
        if (type === 'Poll' && pollExpiration) {
            schedule.scheduleJob(pollExpiration, async () => {
                newPost.isPollEnabled = false;
                await newPost.save();
            });
        }
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
        const userId = req.user._id;
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
        const userId = req.user._id;

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

exports.unsavePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id;
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

        const index = user.savedPosts.indexOf(postId);
        if (index === -1) {
            return res.status(400).json({ error: 'Post is not saved by the user' });
        }

        user.savedPosts.splice(index, 1);
        await user.save();

        return res.status(200).json({ message: 'Post unsaved successfully' });
    } catch (err) {
        console.error('Error unsaving post:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.editPost = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User ID is invalid' });
        }
        if (!postId || !userId) {
            return res.status(400).json({ error: 'Post ID and User ID are required' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ error: 'User is not authorized to edit this post' });
        }

        const { title, content, community, type, pollOptions, link, imageOrVideo, isSpoiler, isNsfw, sendPostReplyNotification } = req.body;

        if (!title || !community) {
            return res.status(400).json({ error: 'Invalid post data. Please provide title and community' });
        }

        if (!user.communities.includes(community)) {
            return res.status(400).json({ error: 'You can only choose communities that you have already joined' });
        }
        post.userId = userId;
        post.username = user.username,
            post.userProfilePic = user.avatar || "null";
        post.title = title;
        post.content = content;
        post.community = community;
        post.type = type;
        post.pollOptions = pollOptions;
        post.link = link;
        post.imageOrVideo = imageOrVideo;
        post.isSpoiler = isSpoiler;
        post.isNsfw = isNsfw;
        post.sendPostReplyNotification = sendPostReplyNotification;

        await post.save();

        return res.status(200).json({ message: 'Post edited successfully' });
    } catch (err) {
        console.error('Error editing post:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
