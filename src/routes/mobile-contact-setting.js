const express = require('express');
const router = express.Router();
const contactSettingsController = require('../controller/mobile-contact-setting');
const auth = require("../middleware/authentication");

router.route('/contact', auth)
    .get(contactSettingsController.getContactSetting)
    .put(contactSettingsController.modifyContactSetting);

module.exports = router;