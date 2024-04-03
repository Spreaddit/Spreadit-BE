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
  .route("/subspreadit/:subspreaditname/top/")
  .get(auth.authentication, listingController.sortPostTopCommunity);
router
  .route("/subspreadit/:subspreaditname/new")
  .get(auth.authentication, listingController.sortPostNewCommunity);

router
  .route("/sort/views")
  .get(auth.authentication, listingController.sortPostViews);
router
  .route("/sort/comments")
  .get(auth.authentication, listingController.sortPostComment);
router
  .route("/sort/best")
  .get(auth.authentication, listingController.sortPostBest);
router
  .route("/sort/hot")
  .get(auth.authentication, listingController.sortPostHot);

router
  .route("/subspreadit/:subspreaditname/hot")
  .get(auth.authentication, listingController.sortPostHotCommunity);

router
  .route("/subspreadit/:subspreaditname/random")
  .get(auth.authentication, listingController.sortPostRandomCommunity);

module.exports = router;
