const express = require("express");
const router = express.Router();
const followUser = require("../controller/follow-user");
const auth = require("../middleware/authentication");

router.route("/:id").post(auth, followUser.followUser);

module.exports = router;
