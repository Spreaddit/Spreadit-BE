const express = require('express');
const router = express.Router();
const layoutSettingsController = require('../controller/layout-setting');
const auth = require("../middleware/authentication");

router.route('/layout', auth)
    .put(layoutSettingsController.checkPasswordMatch);

module.exports = router;