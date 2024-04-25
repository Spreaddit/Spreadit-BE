const express = require("express");
const router = express.Router();
const messageController = require("../controller/message-controller");
const auth = require("../middleware/authentication");
router
  .route("/message/compose/")
  .post(auth.authentication, messageController.sendMessage);

router
  .route("/message/reply/:messageId")
  .post(auth.authentication, messageController.replyMessage);

router
  .route("/message/inbox/")
  .get(auth.authentication, messageController.getInboxMessages);

router
  .route("/message/messages/")
  .get(auth.authentication, messageController.getAllMessages);

router
  .route("/message/postreplies/")
  .get(auth.authentication, messageController.getPostReplies);

router
  .route("/message/sent/")
  .get(auth.authentication, messageController.getSentMessages);

router
  .route("/message/deletemsg/:messageId")
  .delete(auth.authentication, messageController.deleteMessage);

module.exports = router;
