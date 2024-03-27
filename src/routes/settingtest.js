const express = require('express');
const router = express.Router();

///////////////////////////////////////////////
//settings test
const layoutSettingsController = require('../controller/layout-setting');
const auth = require("../middleware/authentication");
router.route('/layout', auth)
    .put(layoutSettingsController.checkPasswordMatch);


const feedSettingsController = require('../controller/feed-seeting');
router.route('/feed', auth)
    .get(feedSettingsController.getFeedSetting)
    .put(feedSettingsController.modifyFeedSetting);


const profileSettingsController = require('../controller/profile-setting');
router.route('/profile', auth)
    .get(profileSettingsController.getProfileSetting)
    .put(profileSettingsController.modifyProfileSettings);

const safetyAndPrivacySettingsController = require('../controller/safety-and-privacy-setting');
router.route('/safety-privacy', auth)
    .get(safetyAndPrivacySettingsController.getSafetyAndPrivacySettings)
    .put(safetyAndPrivacySettingsController.modifySafetyAndPrivacySettings);


const emailSettingsController = require('../controller/email-setting');
router.route('/email', auth)
    .get(emailSettingsController.getEmailSetting)
    .put(emailSettingsController.modifyEmailSetting);


const accountSettingsController = require('../controller/account-setting');
router.route('/account', auth)
    .get(accountSettingsController.getAccountSettings)
    .put(accountSettingsController.modifyAccountSettings)
    .delete(accountSettingsController.deleteAccount);

const blockingSettingsController = require('../controller/mobile-blocking-permissions-setting');
router.route('/blocking-permissions', auth)
    .get(blockingSettingsController.getBlockingSetting)
    .put(blockingSettingsController.modifyBlockingSetting);
///////////////////////////////////////////////
module.exports = router;