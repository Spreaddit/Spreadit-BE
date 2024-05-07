const express = require("express");
const auth = require("../middleware/authentication");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const router = express.Router();
const upload = require("../service/fileUpload");
const authController = require("../controller/auth-controller.js");

router.use(passport.initialize());
router.use(cookieParser("spreaditsecret"));

router.route("/signup").post(authController.signUp);

router.route("/login").post(authController.logIn);

router
  .route("/google/oauth")
  .post(auth.verifyGoogleToken, authController.googleOauth);

router
  .route("/google/connected-accounts")
  .post(
    auth.verifyGoogleToken,
    auth.authentication,
    authController.googleConnectedAccounts
  );

router
  .route("/settings/add-password/email")
  .post(auth.authentication, authController.addPasswordSendEmail);

router
  .route("/settings/add-password")
  .post(auth.authentication, authController.addPasswordConnectedAccounts);

router.route("/forgot-password").post(authController.forgotPassword);

router.route("/app/forgot-password").post(authController.appForgotPassword);

router
  .route("/reset-password-by-token")
  .post(authController.resetPasswordByToken);

router
  .route("/reset-password/user-info")
  .get(authController.resetPasswordUserInfo);

router.route("/reset-password").post(authController.resetPassword);

router.route("/verify-email/:emailToken").post(authController.verifyEmail);

router.route("/check-username").post(authController.checkUsername);

router.route("/forgot-username").post(authController.forgotUsername);

router.route("/user/profile-info/:username").get(authController.getUserInfo);

router.route("/user/profile-info").put(
  auth.authentication,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  authController.updateUserInfo
);

module.exports = router;
