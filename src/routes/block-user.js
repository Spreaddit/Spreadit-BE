const express = require("express");
const router = express.Router();
const blockUserController = require("../controller/block-user");
const auth = require("../middleware/authentication");

router.route("/block", auth).post(blockUserController.blockUser);

module.exports = router;
