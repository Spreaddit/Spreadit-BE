const express = require('express');
const router = express.Router();
const chatandmessagingController = require('../controller/chat-and-messaging-setting');
const auth = require("../middleware/authentication");

router.route('/chat-and-messaging', auth)
    .get(chatandmessagingController.getChatAndMessagingSetting);


module.exports = router;