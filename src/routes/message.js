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
  .route("/message/readmsg/:messageId")
  .post(auth.authentication, messageController.readMessage);
router
  .route("/message/unreadmsg/:messageId")
  .post(auth.authentication, messageController.unreadMessage);
router
  .route("/message/readallmessages/")
  .post(auth.authentication, messageController.markAllAsRead);

router
  .route("/message/unread/")
  .get(auth.authentication, messageController.getUnreadMessages);

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
  .route("/message/mentions/")
  .get(auth.authentication, messageController.getUserMentions);

router
  .route("/message/sent/")
  .get(auth.authentication, messageController.getSentMessages);

router
  .route("/message/deletemsg/:messageId")
  .delete(auth.authentication, messageController.deleteMessage);

router
  .route("/message/unreadcount/")
  .get(auth.authentication, messageController.getUnreadMessageCount);

router
  .route("/message/reportmsg/:messageId")
  .post(auth.authentication, messageController.reportMessage);
router
  .route("/message/:messageId/")
  .get(auth.authentication, messageController.getMessageById);

module.exports = router;
