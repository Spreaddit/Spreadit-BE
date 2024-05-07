const express = require("express");
const router = express.Router();
const postController = require("../controller/post-controller");
const upload = require("../service/fileUpload");
const auth = require("../middleware/authentication");

router
  .route("/")
  .post(
    auth.authentication,
    upload.array("attachments"),
    postController.createPost
  );

router.route("/:postId").delete(auth.authentication, postController.deletePost);

router
  .route("/community/:community")
  .get(auth.authentication, postController.getAllPostsInCommunity);

router.route("/save").get(auth.authentication, postController.getSavedPosts);

router
  .route("/:postId/save")
  .post(auth.authentication, postController.savePost);

router
  .route("/:postId/unsave")
  .post(auth.authentication, postController.unsavePost);

router.route("/:postId/edit").put(auth.authentication, postController.editPost);

router
  .route("/:postId/spoiler")
  .post(auth.authentication, postController.spoilerPostContent);

router
  .route("/:postId/unspoiler")
  .post(auth.authentication, postController.unspoilerPostContent);

router
  .route("/:postId/lock")
  .post(auth.authentication, postController.lockPostComments);

router
  .route("/:postId/unlock")
  .post(auth.authentication, postController.unlockPostComments);

router
  .route("/:postId/upvote")
  .post(auth.authentication, postController.upvotePost);

router
  .route("/:postId/downvote")
  .post(auth.authentication, postController.downvotePost);

router
  .route("/downvote")
  .get(auth.authentication, postController.getDownvotedPosts);

router
  .route("/upvote")
  .get(auth.authentication, postController.getUpvotedPosts);

router
  .route("/:postId/hide")
  .post(auth.authentication, postController.hidePost);

router
  .route("/:postId/unhide")
  .post(auth.authentication, postController.unhidePost);

router.route("/hide").get(auth.authentication, postController.getHiddenPosts);

router
  .route("/:postId/nsfw")
  .post(auth.authentication, postController.markPostAsNsfw);

router
  .route("/:postId/unnsfw")
  .post(auth.authentication, postController.markPostAsNotNsfw);

router
  .route("/:postId/report")
  .post(auth.authentication, postController.reportPost);

router
  .route("/:communityName/report")
  .get(auth.authentication, postController.getReportedPostsInCommunity);

router
  .route("/:postId/poll/vote")
  .post(auth.authentication, postController.voteInPoll);

router
  .route("/username/:username")
  .get(auth.authentication, postController.getAllUserPosts);

router.route("/:postId").get(auth.authentication, postController.getPostById);

module.exports = router;
