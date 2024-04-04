const express = require('express');
const router = express.Router();
const postController = require('../controller/post-controller');
const upload = require("../service/fileUpload");
const auth = require("../middleware/authentication");


router.route('/')
    .get(auth.authentication, postController.getAllUserPosts)
    .post(auth.authentication, upload.array('images'), postController.createPost);

router.route('/community/:community')
    .get(auth.authentication, postController.getAllPostsInCommunity)

router.route('/:postId/save')
    .post(auth.authentication, postController.savePost);

router.route('/save')
    .get(auth.authentication, postController.getSavedPosts);

router.route('/:postId/unsave')
    .post(auth.authentication, postController.unsavePost);

router.route('/:postId/edit')
    .put(auth.authentication, postController.editPost);

router.route('/:postId/spoiler')
    .post(auth.authentication, postController.spoilerPostContent);

router.route('/:postId/unspoiler')
    .post(auth.authentication, postController.unspoilerPostContent);

router.route('/:postId/lock')
    .post(auth.authentication, postController.lockPostComments);

router.route('/:postId/unlock')
    .post(auth.authentication, postController.unlockPostComments);

router.route('/:postId/upvote')
    .post(auth.authentication, postController.upvotePost);

router.route('/:postId/downvote')
    .post(auth.authentication, postController.downvotePost);

router.route('/downvote')
    .get(auth.authentication, postController.getDownvotedPosts);

router.route('/upvote')
    .get(auth.authentication, postController.getUpvotedPosts);

module.exports = router;    