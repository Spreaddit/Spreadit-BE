const express = require("express");
const router = express.Router();
const messageController = require("../controller/message-controller");
const auth = require("../middleware/authentication");
router
  .route("/message/compose/")
  .post(auth.authentication, messageController.sendMessage);

module.exports = router;
