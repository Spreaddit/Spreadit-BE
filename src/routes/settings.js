const express = require("express");
const router = express.Router();
const SettingsController = require("../controller/settings");
const upload = require("../service/fileUpload");
const auth = require("../middleware/authentication");

router
  .route("/account")
  .get(auth.authentication, SettingsController.getAccountSettings)
  .put(auth.authentication, SettingsController.modifyAccountSettings)
  .delete(auth.authentication, SettingsController.deleteAccount);

router
  .route("/chat-and-messaging")
  .get(auth.authentication, SettingsController.getChatAndMessagingSetting)
  .put(auth.authentication, SettingsController.modifyChatAndMessagingSetting)
  .post(auth.authentication, SettingsController.makeAllAsRead);

router
  .route("/email")
  .get(auth.authentication, SettingsController.getEmailSetting)
  .put(auth.authentication, SettingsController.modifyEmailSetting);

router
  .route("/feed")
  .get(auth.authentication, SettingsController.getFeedSetting)
  .put(auth.authentication, SettingsController.modifyFeedSetting);

router
  .route("/layout")
  .put(auth.authentication, SettingsController.checkPasswordMatch);

router
  .route("/notifications")
  .get(auth.authentication, SettingsController.getNotificationSetting)
  .put(auth.authentication, SettingsController.modifyNotificationSetting);

router
  .route("/profile")
  .get(auth.authentication, SettingsController.getProfileSetting)
  .put(
    auth.authentication,
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "banner", maxCount: 1 },
    ]),
    SettingsController.modifyProfileSettings
  );

router
  .route("/safety-privacy")
  .get(auth.authentication, SettingsController.getSafetyAndPrivacySettings)
  .put(auth.authentication, SettingsController.modifySafetyAndPrivacySettings);

module.exports = router;
