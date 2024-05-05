const express = require("express");
const auth = require("../middleware/authentication");
const upload = require("../service/fileUpload");
const router = express.Router();
const commentController = require("../controller/comment-controller");

router
  .route("/post/comment/:postId")
  .post(
    auth.authentication,
    upload.array("attachments"),
    commentController.createComment
  );

router
  .route("/posts/comment/delete/:commentId")
  .delete(auth.authentication, commentController.deleteComment);

router
  .route("/posts/comment/:postId")
  .get(auth.authentication, commentController.getCommentByPostId);

router
  .route("/comments/user/:username")
  .get(auth.authentication, commentController.getCommentByUsername);

router
  .route("/comments/saved/user")
  .get(auth.authentication, commentController.getCommentSaved);

router
  .route("/comments/:commentId/edit")
  .post(auth.authentication, commentController.editComment);

router
  .route("/comment/:parentCommentId/reply")
  .post(
    auth.authentication,
    upload.array("attachments"),
    commentController.createReply
  );

router
  .route("/comments/:commentId/replies")
  .get(auth.authentication, commentController.getRepliesByCommentId);

router
  .route("/comments/:commentId/hide")
  .post(auth.authentication, commentController.hideComment);

router
  .route("/comments/:commentId/upvote")
  .post(auth.authentication, commentController.upvoteComment);

router
  .route("/comments/:commentId/downvote")
  .post(auth.authentication, commentController.downvoteComment);

router
  .route("/comments/:commentId/save")
  .post(auth.authentication, commentController.saveComment);

router
  .route("/comments/:commentId/report")
  .post(auth.authentication, commentController.reportComment);

module.exports = router;
