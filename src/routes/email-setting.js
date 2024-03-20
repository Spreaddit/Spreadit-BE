const express = require('express');
const router = express.Router();
const emailSettingsController = require('../controller/email-setting');
const auth = require("../middleware/authentication");

router.route('/email', auth)
    .get(emailSettingsController.getEmailSetting)
    .put(emailSettingsController.modifyEmailSetting);


module.exports = router;