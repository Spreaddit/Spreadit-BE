const express = require("express");
const router = express.Router();
const followUserController = require("../controller/follow-user");
const auth = require("../middleware/authentication");

router.route("/follow", auth).post(followUserController.followUser);

module.exports = router;
