const express = require("express");
const router = express.Router();
const followUserController = require("../controller/follow-user");
const auth = require("../middleware/authentication");
const reportUserController = require("../controller/report-user");
const unfollowUserController = require("../controller/unfollow-user");
const showFriendController = require("../controller/show-friend-information");
const blockUserController = require("../controller/block-user");

router.route("/block", auth).post(blockUserController.blockUser);

router.route("/friends/:username", auth).get(showFriendController.showFriend);

router.route("/follow", auth).post(followUserController.followUser);

router.route("/report", auth).post(reportUserController.reportUser);

router.route("/unfollow", auth).post(unfollowUserController.unfollowUser);

module.exports = router;
