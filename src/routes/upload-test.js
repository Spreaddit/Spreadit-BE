const express = require('express');
const router = express.Router();
const cloudinary = require("../service/cloudinary");
const upload = require("../service/fileUpload");
const { uploadMedia } = require("../service/cloudinary.js");
const auth = require("../middleware/authentication.js");
const Post = require('../models/post');
const User = require('../models/user');

router.post('/upload/test', upload.single('image'), function (req, res) {
    console.log(req.file);
    uploadMedia(req.file);
});

router.post('/test', auth.authentication, upload.array('images'), async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User ID is invalid' });
        }

        const newPost = new Post({
            userId,
            username: user.username,
            userProfilePic: user.avatar || "null",
            title: req.body.title,
            content: req.body.content,
            community: req.body.community,
            type: req.body.type,
            pollOptions: req.body.pollOptions,
            pollExpiration: req.body.pollExpiration,
            isPollEnabled: req.body.isPollEnabled, // Assuming isPollEnabled should be set here
            link: req.body.link,
            videos: req.body.videos,
            isSpoiler: req.body.isSpoiler,
            isNsfw: req.body.isNsfw,
            sendPostReplyNotification: req.body.sendPostReplyNotification
        });

        if (!newPost.title || !newPost.community) {
            return res.status(400).json({ error: 'Invalid post data. Please provide title and community' });
        }
        user.communities.push('string');
        if (!user.communities.includes(newPost.community)) {
            return res.status(400).json({ error: 'You can only choose communities that you have already joined' });
        }

        if (newPost.type === 'poll' && newPost.pollOptions && newPost.pollOptions.length > 0 && newPost.pollExpiration) {
            const expirationDate = new Date(newPost.pollExpiration);
            const currentTime = new Date();
            newPost.isPollEnabled = expirationDate > currentTime; // Corrected assignment
        }

        if (req.files && req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                const result = await uploadMedia(req.files[i]); // Corrected accessing req.files array
                const url = result.secure_url;
                newPost.images.push(url);
                console.log(url);
            }
        }

        await newPost.save();
        return res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
        console.error('Error creating post:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }

});


module.exports = router;