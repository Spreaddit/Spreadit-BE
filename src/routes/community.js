const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const router = express.Router();
router.use(passport.initialize());
router.use(cookieParser("spreaditsecret"));
const auth = require("../middleware/authentication");
const communityController = require("../controller/community-controller.js");

router
  .route("/community/add-to-favourites")
  .post(auth.authentication, communityController.addToFavourites);

router
  .route("/community/remove-favourite")
  .post(auth.authentication, communityController.removeFavourite);

router
  .route("/community/is-favourite")
  .get(auth.authentication, communityController.isFavourite);

router
  .route("/community/mute")
  .post(auth.authentication, communityController.muteCommunity);

router
  .route("/community/unmute")
  .post(auth.authentication, communityController.unmuteCommunity);

router
  .route("/community/is-mute")
  .get(auth.authentication, communityController.isCommunityMute);

router
  .route("/community/muted")
  .get(auth.authentication, communityController.mutedCommunities);

router
  .route("/community/subscribe")
  .post(auth.authentication, communityController.subscribeToCommunity);

router
  .route("/community/unsubscribe")
  .post(auth.authentication, communityController.unsubscribeFromCommunity);

router
  .route("/community/is-subscribed")
  .get(auth.authentication, communityController.isSubscribed);

router
  .route("/community/top-communities")
  .get(auth.authentication, communityController.topCommunities);

router
  .route("/community/random-category")
  .get(auth.authentication, communityController.randomCategory);

router
  .route("/community/list")
  .get(auth.authentication, communityController.getAllCommunities);

router
  .route("/community/get-specific-category")
  .get(auth.authentication, communityController.specificCategory);

router
  .route("/community/create")
  .post(auth.authentication, communityController.createCommunity);

module.exports = router;
