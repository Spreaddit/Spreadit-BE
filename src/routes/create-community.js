const express = require('express');
const router = express.Router();
const createCommunityController = require('../controller/create-community');

router.route('/communities/create', auth)
    .post(createCommunityController.createNewCommunity);

module.exports = router;
