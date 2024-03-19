const express = require('express');
const router = express.Router();
const safetyAndPrivacySettingsController = require('../controller/safety-and-privacy-setting');
const auth = require("../middleware/authentication");

router.route('/safety-privacy', auth)
    .get(safetyAndPrivacySettingsController.getSafetyAndPrivacySettings)
    .put(safetyAndPrivacySettingsController.modifySafetyAndPrivacySettings);

module.exports = router;