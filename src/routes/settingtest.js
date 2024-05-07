const express = require("express");
const router = express.Router();
const messageController = require("../controller/message-controller");

///////////////////////////////////////////////
//settings test
const layoutSettingsController = require("../controller/settings");
const auth = require("../middleware/authentication");
router.route("/layout", auth).put(layoutSettingsController.checkPasswordMatch);

const feedSettingsController = require("../controller/settings");
router
  .route("/feed", auth)
  .get(feedSettingsController.getFeedSetting)
  .put(feedSettingsController.modifyFeedSetting);

const profileSettingsController = require("../controller/settings");
router
  .route("/profile", auth)
  .get(profileSettingsController.getProfileSetting)
  .put(profileSettingsController.modifyProfileSettings);

const safetyAndPrivacySettingsController = require("../controller/settings");
router
  .route("/safety-privacy", auth)
  .get(safetyAndPrivacySettingsController.getSafetyAndPrivacySettings)
  .put(safetyAndPrivacySettingsController.modifySafetyAndPrivacySettings);

const emailSettingsController = require("../controller/settings");
router
  .route("/email", auth)
  .get(emailSettingsController.getEmailSetting)
  .put(emailSettingsController.modifyEmailSetting);

const accountSettingsController = require("../controller/settings");
router
  .route("/account", auth)
  .get(accountSettingsController.getAccountSettings)
  .put(accountSettingsController.modifyAccountSettings)
  .delete(accountSettingsController.deleteAccount);

const blockingSettingsController = require("../controller/mobile-settings");
router
  .route("/blocking-permissions", auth)
  .get(blockingSettingsController.getBlockingSetting)
  .put(blockingSettingsController.modifyBlockingSetting);

const notificationSettingsController = require("../controller/settings");
router
  .route("/notifications", auth)
  .get(notificationSettingsController.getNotificationSetting)
  .put(notificationSettingsController.modifyNotificationSetting);

const chatandmessagingController = require("../controller/settings");
router
  .route("/chat-and-messaging", auth)
  .get(chatandmessagingController.getChatAndMessagingSetting)
  .put(chatandmessagingController.modifyChatAndMessagingSetting)
  .post(messageController.markAllAsRead); //needs to be handled by mahmoud

const contactSettingsController = require("../controller/mobile-settings");
router
  .route("/contact", auth)
  .get(contactSettingsController.getContactSetting)
  .put(contactSettingsController.modifyContactSetting);
///////////////////////////////////////////////
module.exports = router;
