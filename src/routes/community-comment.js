const express = require("express");
const router = express.Router();
const communityCommentController = require("../controller/community-comment");
const upload = require("../service/fileUpload");
const auth = require("../middleware/authentication");

router
    .route("/community/moderation/:communityName/spam-post/:postId")
    .post(auth.authentication, communityCommentController.spamComment);

router
    .route("/community/moderation/:communityName/get-spam-posts")
    .get(auth.authentication, communityCommentController.getSpamComments);

module.exports = router;
