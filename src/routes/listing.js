const express = require("express");
const router = express.Router();
const listingController = require("../controller/listing-controller");
const auth = require("../middleware/authentication");

router
  .route("/home/new")
  .get(auth.authentication, listingController.sortPostNew);
router
  .route("/home/top")
  .get(auth.authentication, listingController.sortPostTopTime);
router
  .route("/home/top/alltime")
  .get(auth.authentication, listingController.sortPostTop);
router
  .route("/subspreadit/:subspreaditname/top/")
  .get(auth.authentication, listingController.sortPostTopTimeCommunity);

router
  .route("/subspreadit/:subspreaditname/top/alltime")
  .get(auth.authentication, listingController.sortPostTopCommunity);
router
  .route("/subspreadit/:subspreaditname/new")
  .get(auth.authentication, listingController.sortPostNewCommunity);

router
  .route("/home/views")
  .get(auth.authentication, listingController.sortPostViews);
router
  .route("/home/comments")
  .get(auth.authentication, listingController.sortPostComment);
router
  .route("/home/best")
  .get(auth.authentication, listingController.sortPostBest);
router
  .route("/home/hot")
  .get(auth.authentication, listingController.sortPostHot);

router
  .route("/subspreadit/:subspreaditname/hot")
  .get(auth.authentication, listingController.sortPostHotCommunity);

router
  .route("/subspreadit/:subspreaditname/random")
  .get(auth.authentication, listingController.sortPostRandomCommunity);

router
  .route("/subspreadit/:subspreaditname/top/:time")
  .get(auth.authentication, listingController.sortPostTopTimeCommunity);

router
  .route("/home/top/:time")
  .get(auth.authentication, listingController.sortPostTopTime);

router
  .route("/home/recentposts")
  .get(auth.authentication, listingController.recentPosts);

router
  .route("/deleterecent/")
  .delete(auth.authentication, listingController.deleteRecentPost);
module.exports = router;
