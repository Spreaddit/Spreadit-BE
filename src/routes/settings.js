const express = require('express');
const router = express.Router();
const SettingsController = require('../controller/settings');
const auth = require("../middleware/authentication");


router.route('/account', auth)
    .get(SettingsController.getAccountSettings)
    .put(SettingsController.modifyAccountSettings)
    .delete(SettingsController.deleteAccount);

router.route('/chat-and-messaging', auth)
    .get(SettingsController.getChatAndMessagingSetting)
    .put(SettingsController.modifyChatAndMessagingSetting)
    .post(SettingsController.makeAllAsRead);

router.route('/email', auth)
    .get(SettingsController.getEmailSetting)
    .put(SettingsController.modifyEmailSetting);

router.route('/feed', auth)
    .get(SettingsController.getFeedSetting)
    .put(SettingsController.modifyFeedSetting);

router.route('/layout', auth)
    .put(SettingsController.checkPasswordMatch);

router.route('/notifications', auth)
    .get(SettingsController.getNotificationSetting)
    .put(SettingsController.modifyNotificationSetting);

router.route('/profile', auth)
    .get(SettingsController.getProfileSetting)
    .put(SettingsController.modifyProfileSettings);

router.route('/safety-privacy', auth)
    .get(SettingsController.getSafetyAndPrivacySettings)
    .put(SettingsController.modifySafetyAndPrivacySettings);

module.exports = router;