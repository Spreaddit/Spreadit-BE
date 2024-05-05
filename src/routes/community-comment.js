const express = require("express");
const router = express.Router();
const communityCommentController = require("../controller/community-comment");
const upload = require("../service/fileUpload");
const auth = require("../middleware/authentication");

router
  .route("/community/moderation/:communityName/spam-comment/:commentId")
  .post(auth.authentication, communityCommentController.spamComment);

router
  .route("/community/moderation/:communityName/get-spam-comments")
  .get(auth.authentication, communityCommentController.getSpamComments);

router
  .route("/community/moderation/:communityName/:commentId/lock-comment")
  .post(auth.authentication, communityCommentController.lockComment);

router
  .route("/community/moderation/:communityName/:commentId/unlock-comment")
  .post(auth.authentication, communityCommentController.unlockComment);

router
  .route("/community/moderation/:communityName/:commentId/approve-comment")
  .post(auth.authentication, communityCommentController.approveComment);

router
  .route("/community/moderation/:communityName/:commentId/remove-comment")
  .post(auth.authentication, communityCommentController.removeComment);

router
  .route("/community/moderation/:communityName/get-edited-comments")
  .get(
    auth.authentication,
    communityCommentController.getEdititedCommentsHistory
  );

router
  .route("/community/moderation/:communityName/get-reported-comments")
  .get(auth.authentication, communityCommentController.getReportedComments);
module.exports = router;
