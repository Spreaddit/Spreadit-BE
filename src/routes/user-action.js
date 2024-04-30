const express = require("express");
const router = express.Router();
const followUserController = require("../controller/follow-user");
const auth = require("../middleware/authentication");
const reportUserController = require("../controller/report-user");
const unfollowUserController = require("../controller/unfollow-user");
const showFriendController = require("../controller/show-friend-information");
const blockUserController = require("../controller/block-user");

router.route("/block").post(auth.authentication, blockUserController.blockUser);

router
  .route("/friends/:username")
  .get(auth.authentication, showFriendController.showFriend);

router
  .route("/follow")
  .post(auth.authentication, followUserController.followUser);

router
  .route("/report")
  .post(auth.authentication, reportUserController.reportUser);

router
  .route("/unfollow")
  .post(auth.authentication, unfollowUserController.unfollowUser);

router.route("/unblock").post(auth.authentication, blockUserController.unBlock);

router
  .route("/isfollowed/:username")
  .get(auth.authentication, followUserController.isFollowed);
router
  .route("/getfollowers")
  .get(auth.authentication, followUserController.getFollowers);

module.exports = router;
