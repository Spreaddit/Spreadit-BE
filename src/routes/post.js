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

router.route('/:postId/unsave', auth)
    .post(auth.authentication, postController.unsavePost);

router.route('/:postId/edit', auth)
    .post(auth.authentication, postController.editPost);

module.exports = router;    