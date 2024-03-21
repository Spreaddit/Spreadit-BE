const express = require('express');
const router = express.Router();
const blockingSettingsController = require('../controller/mobile-blocking-permissions-setting');
const auth = require("../middleware/authentication");

router.route('/blocking-permissions', auth)
    .get(blockingSettingsController.getBlockingSetting)
    .put(blockingSettingsController.modifyBlockingSetting);


module.exports = router;