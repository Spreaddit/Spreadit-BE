const express = require('express');
const router = express.Router();
const postController = require('../controller/post-controller');
const auth = require("../middleware/authentication");

router.route('')
    .get(postController.getAllPosts);

router.route('/:userId')
    .get(postController.getAllUserPosts);

router.route('/:userId', auth)
    .post(postController.createPost);

module.exports = router;    