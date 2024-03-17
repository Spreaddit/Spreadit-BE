const express = require('express');
const router = express.Router();
const accountSettingsController = require('../controller/account-setting');

router.route('/account')
    .get(accountSettingsController.getAccountSettings);

module.exports = router;