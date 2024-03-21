const express = require('express');
const router = express.Router();
const accountSettingsController = require('../controller/account-setting');
const auth = require("../middleware/authentication");

router.route('/account', auth)
    .get(accountSettingsController.getAccountSettings)
    .put(accountSettingsController.modifyAccountSettings)
    .delete(accountSettingsController.deleteAccount);

router.route('/general/account', auth)
    .get(accountSettingsController.getAccountSettings)
    .put(accountSettingsController.modifyAccountSettings)
    .delete(accountSettingsController.deleteAccount)

module.exports = router;