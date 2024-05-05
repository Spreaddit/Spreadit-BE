const express = require("express");
const router = express.Router();
const mobileSettingsController = require("../controller/mobile-settings");
const auth = require("../middleware/authentication");

router
  .route("/general/account")
  .get(auth.authentication, mobileSettingsController.getAccountSettings)
  .put(auth.authentication, mobileSettingsController.modifyAccountSettings)
  .delete(auth.authentication, mobileSettingsController.deleteAccount);

router
  .route("/blocking-permissions")
  .get(auth.authentication, mobileSettingsController.getBlockingSetting)
  .put(auth.authentication, mobileSettingsController.modifyBlockingSetting);

router
  .route("/contact")
  .get(auth.authentication, mobileSettingsController.getContactSetting)
  .put(auth.authentication, mobileSettingsController.modifyContactSetting);

module.exports = router;
