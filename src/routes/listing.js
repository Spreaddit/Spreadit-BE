const express = require("express");
const router = express.Router();
const listingController = require("../controller/listing-controller");
const auth = require("../middleware/authentication");

router
  .route("/sort/new")
  .get(auth.authentication, listingController.sortPostNew);
router
  .route("/sort/top")
  .get(auth.authentication, listingController.sortPostTop);
router
  .route("/sort/top/:subspreaditname")
  .get(auth.authentication, listingController.sortPostTopCommunity);
router
  .route("/sort/new/:subspreaditname")
  .get(auth.authentication, listingController.sortPostNewCommunity);

router
  .route("/sort/views")
  .get(auth.authentication, listingController.sortPostViews);
router
  .route("/sort/comment")
  .get(auth.authentication, listingController.sortPostComment);
router
  .route("/sort/best")
  .get(auth.authentication, listingController.sortPostBest);
router
  .route("/sort/hot")
  .get(auth.authentication, listingController.sortPostHot);

router
  .route("/sort/hot/:subspreaditname")
  .get(auth.authentication, listingController.sortPostHotCommunity);

module.exports = router;
