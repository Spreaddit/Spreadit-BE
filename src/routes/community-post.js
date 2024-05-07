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
  .route("/community/moderation/:communityName/:postId/remove-post")
  .post(auth.authentication, communityPostController.removePost);

router
  .route("/community/moderation/:communityName/unmoderated-posts")
  .get(auth.authentication, communityPostController.getUnmoderatedPosts);

router
  .route("/community/moderation/:communityName/schedule-posts")
  .get(auth.authentication, communityPostController.getScheduledPosts);

router
  .route("/community/moderation/:communityName/:postId/approve-post")
  .post(auth.authentication, communityPostController.approvePost);

module.exports = router;
