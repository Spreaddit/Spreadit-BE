const express = require('express');
const router = express.Router();
const accountSettingsController = require('../controller/account-setting');
const chatandmessagingController = require('../controller/chat-and-messaging-setting');
const emailSettingsController = require('../controller/email-setting');
const feedSettingsController = require('../controller/feed-seeting');
const layoutSettingsController = require('../controller/layout-setting');
const notificationSettingsController = require('../controller/notification-setting');
const profileSettingsController = require('../controller/profile-setting');
const safetyAndPrivacySettingsController = require('../controller/safety-and-privacy-setting');
const auth = require("../middleware/authentication");


router.route('/account', auth)
    .get(accountSettingsController.getAccountSettings)
    .put(accountSettingsController.modifyAccountSettings)
    .delete(accountSettingsController.deleteAccount);

router.route('/chat-and-messaging', auth)
    .get(chatandmessagingController.getChatAndMessagingSetting)
    .put(chatandmessagingController.modifyChatAndMessagingSetting)
    .post(chatandmessagingController.makeAllAsRead);

router.route('/email', auth)
    .get(emailSettingsController.getEmailSetting)
    .put(emailSettingsController.modifyEmailSetting);

router.route('/feed', auth)
    .get(feedSettingsController.getFeedSetting)
    .put(feedSettingsController.modifyFeedSetting);

router.route('/layout', auth)
    .put(layoutSettingsController.checkPasswordMatch);

router.route('/notifications', auth)
    .get(notificationSettingsController.getNotificationSetting)
    .put(notificationSettingsController.modifyNotificationSetting);

router.route('/profile', auth)
    .get(profileSettingsController.getProfileSetting)
    .put(profileSettingsController.modifyProfileSettings);

router.route('/safety-privacy', auth)
    .get(safetyAndPrivacySettingsController.getSafetyAndPrivacySettings)
    .put(safetyAndPrivacySettingsController.modifySafetyAndPrivacySettings);

module.exports = router;