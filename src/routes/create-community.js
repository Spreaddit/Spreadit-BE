const express = require('express');
const router = express.Router();
const auth = require("../middleware/authentication");
const createCommunityController = require('../controller/create-community');

router.route('/communities/create', auth)
    .post(createCommunityController.createNewCommunity);

module.exports = router;
