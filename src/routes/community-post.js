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

router
    .route("/community/moderation/:communityName/spam-post/:postId/add-removal-reason")
    .get(auth.authentication, communityPostController.addRemovalReasonPosts);

router
    .route("/community/moderation/:communityName/:postId/lock-post")
    .post(auth.authentication, communityPostController.lockPost);

router
    .route("/community/moderation/:communityName/:postId/unlock-post")
    .post(auth.authentication, communityPostController.unlockPost);

router
    .route("/community/moderation/:communityName/:postId/remove-post")
    .post(auth.authentication, communityPostController.removePost);

module.exports = router;
