const express = require("express");
const auth = require("../middleware/authentication");
const router = express.Router();
const NotificationType = require("./../../seed-data/constants/notificationType");
const adminController = require("../controller/admin-controller");

router
  .route("/dashboard/ban")
  .post(auth.authentication, adminController.adminBan);

router
  .route("/dashboard/unban")
  .post(auth.authentication, adminController.adminUnban);

router
  .route("/dashboard/users")
  .post(auth.authentication, adminController.adminSearchUser);

router
  .route("/dashboard/posts")
  .get(auth.authentication, adminController.adminGetReportedPosts);

router
  .route("/dashboard/comments")
  .get(auth.authentication, adminController.adminGetReportedComments);

module.exports = router;
