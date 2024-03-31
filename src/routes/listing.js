const express = require("express");
const router = express.Router();
const listingController = require("../controller/listing-controller");
const auth = require("../middleware/authentication");

router.route("/new", auth).get(listingController.sortPostNew);

module.exports = router;
