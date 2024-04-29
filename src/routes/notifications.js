const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notification-controller");
const upload = require("../service/fileUpload");
const auth = require("../middleware/authentication");

router
    .route("/notifications/mark-all-as-read")
    .put(auth.authentication, notificationController.markAllAsRead);

router
    .route("notifications/read-notification/:notificationId")
    .put(auth.authentication, notificationController.markNotificationAsRead);

router
    .route("/notification/unread/count")
    .get(auth.authentication, notificationController.getUnreadNotificationCount);

router
    .route("/notification")
    .get(auth.authentication, notificationController.getAllNotifications);




module.exports = router;