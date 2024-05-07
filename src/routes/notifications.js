const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notification-controller");
const upload = require("../service/fileUpload");
const auth = require("../middleware/authentication");

router
  .route("/notifications/subscribe")
  .put(auth.authentication, notificationController.subscribe);

router
  .route("/notifications/mark-all-as-read")
  .put(auth.authentication, notificationController.markAllAsRead);

router
  .route("/notifications/read-notification/:notificationId")
  .put(auth.authentication, notificationController.markNotificationAsRead);

router
  .route("/notifications/unread/count")
  .get(auth.authentication, notificationController.getUnreadNotificationCount);

router
  .route("/notifications")
  .get(auth.authentication, notificationController.getAllNotifications);

router
  .route("/community/suggest")
  .get(auth.authentication, notificationController.suggestCommunity);

router
  .route("/notifications/hide/:notificationId")
  .post(auth.authentication, notificationController.hideNotification);

router
  .route("/community/update/disable/:communityname")
  .post(auth.authentication, notificationController.disableCommunityUpdates);

module.exports = router;
