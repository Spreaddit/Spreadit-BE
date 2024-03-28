const express = require('express');
const router = express.Router();
const postController = require('../controller/post-controller');
const auth = require("../middleware/authentication");

router.route('')
    .get(postController.getAllPosts);

router.route('/:userId', auth)
    .get(postController.getAllUserPosts)
    .post(postController.createPost);

router.route('/community/:community', auth)
    .get(postController.getAllPostsInCommunity)

router.route('/:postId/save', auth)
    .post(postController.savePost);

router.route('/:userId/save', auth)
    .get(postController.getSavedPosts);

module.exports = router;    