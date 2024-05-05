const express = require("express");
const router = express.Router();
const searchController = require("../controller/search");
const upload = require("../service/fileUpload");
const auth = require("../middleware/authentication");

router.route("/").get(auth.authentication, searchController.getSearch);

router
  .route("/profile")
  .get(auth.authentication, searchController.getProfileSearch);

router
  .route("/suggestions")
  .get(auth.authentication, searchController.getSearchSuggestions);

router
  .route("/trending")
  .get(auth.authentication, searchController.getTrendingPosts);

router
  .route("/log")
  .post(auth.authentication, searchController.logSearchActivity);

router
  .route("/history")
  .get(auth.authentication, searchController.getSearchHistory)
  .delete(auth.authentication, searchController.deleteSearchHistory);

module.exports = router;
