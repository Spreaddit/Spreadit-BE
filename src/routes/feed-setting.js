const express = require('express');
const router = express.Router();
const feedSettingsController = require('../controller/feed-seeting');
const auth = require("../middleware/authentication");

router.route('/feed', auth)
    .get(feedSettingsController.getFeedSetting)
    .put(feedSettingsController.modifyFeedSetting);

module.exports = router;