const express = require("express");
const router = express.Router();
const communityPostController = require("../controller/community-post");
const upload = require("../service/fileUpload");
const auth = require("../middleware/authentication");

router
    .route("/community/moderation/:communityName/spam-post/:postId")
    .post(auth.authentication, communityPostController.spamPost);

router
    .route("/community/moderation/:communityName/get-spam-posts")
    .get(auth.authentication, communityPostController.getSpamPosts);

router
    .route("/community/moderation/:communityName/get-edited-posts")
    .get(auth.authentication, communityPostController.getEdititedPostsHistory);

module.exports = router;
