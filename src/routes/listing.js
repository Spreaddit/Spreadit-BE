const express = require("express");
const router = express.Router();
const listingController = require("../controller/listing-controller");
const auth = require("../middleware/authentication");

router.route("/sort/new", auth).get(listingController.sortPostNew);
router.route("/sort/top", auth).get(listingController.sortPostTop);
router
  .route("/sort/top/:subspreaditname", auth)
  .get(listingController.sortPostTopCommunity);
router
  .route("/sort/new/:subspreaditname", auth)
  .get(listingController.sortPostNewCommunity);

router.route("/sort/views", auth).get(listingController.sortPostViews);
router.route("/sort/comment", auth).get(listingController.sortPostComment);
module.exports = router;
