const express = require('express');
const router = express.Router();
const notificationSettingsController = require('../controller/notification-setting');
const auth = require("../middleware/authentication");

router.route('/notifications', auth)
    .get(notificationSettingsController.getNotificationSetting);

module.exports = router;