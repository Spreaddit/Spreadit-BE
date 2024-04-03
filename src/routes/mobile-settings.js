const express = require('express');
const router = express.Router();
const mobileSettingsController = require('../controller/mobile-settings');
const auth = require("../middleware/authentication");

router.route('/general/account', auth)
    .get(mobileSettingsController.getAccountSettings)
    .put(mobileSettingsController.modifyAccountSettings)
    .delete(mobileSettingsController.deleteAccount);

router.route('/blocking-permissions', auth)
    .get(mobileSettingsController.getBlockingSetting)
    .put(mobileSettingsController.modifyBlockingSetting);

router.route('/contact', auth)
    .get(mobileSettingsController.getContactSetting)
    .put(mobileSettingsController.modifyContactSetting);

module.exports = router;