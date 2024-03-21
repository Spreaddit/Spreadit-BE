const express = require("express");
const router = express.Router();
const unfollowUserController = require("../controller/unfollow-user");
const auth = require("../middleware/authentication");

router.route("/unfollow", auth).post(unfollowUserController.unfollowUser);

module.exports = router;
