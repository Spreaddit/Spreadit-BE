const express = require('express');
const router = express.Router();
const profileSettingsController = require('../controller/profile-setting');
const auth = require("../middleware/authentication");

router.route('/profile', auth)
    .get(profileSettingsController.getProfileSetting)
    .put(profileSettingsController.modifyProfileSettings);

module.exports = router;