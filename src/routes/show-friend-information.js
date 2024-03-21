const express = require("express");
const router = express.Router();
const showFriendController = require("../controller/show-friend-information");
const auth = require("../middleware/authentication");

router.route("/friends/:username", auth).get(showFriendController.showFriend);

module.exports = router;