const express = require('express');
const router = express.Router();
const accountSettingsController = require('../controller/account-setting');
const blockingSettingsController = require('../controller/mobile-blocking-permissions-setting');
const contactSettingsController = require('../controller/mobile-contact-setting');
const auth = require("../middleware/authentication");

router.route('/general/account', auth)
    .get(accountSettingsController.getAccountSettings)
    .put(accountSettingsController.modifyAccountSettings)
    .delete(accountSettingsController.deleteAccount);

router.route('/blocking-permissions', auth)
    .get(blockingSettingsController.getBlockingSetting)
    .put(blockingSettingsController.modifyBlockingSetting);

router.route('/contact', auth)
    .get(contactSettingsController.getContactSetting)
    .put(contactSettingsController.modifyContactSetting);

module.exports = router;