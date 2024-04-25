const express = require("express");
const router = express.Router();
const searchController = require("../controller/search");
const upload = require("../service/fileUpload");
const auth = require("../middleware/authentication");

router
    .route("/")
    .get(auth.authentication, searchController.getSearch);

module.exports = router;