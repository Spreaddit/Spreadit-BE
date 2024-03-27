const express = require("express");
const User = require("../models/user.js");
const axios = require('axios');
//const auth = require("../middleware/authentication");
const { verifyGoogleToken } = require('../middleware/authentication');
const config = require("../configuration");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const sendEmail = require('../models/send-email.js');
const jwt = require('jwt-decode');
const bcrypt = require("bcryptjs");

const router = express.Router();
router.use(passport.initialize());
//const express = require('express');
//router.use(passport.session());
router.use(cookieParser("spreaditsecret"));
///////////////////////////////////////////////
//settings test
const layoutSettingsController = require('../controller/layout-setting');
const auth = require("../middleware/authentication");
router.route('/layout', auth)
  .put(layoutSettingsController.checkPasswordMatch);


const feedSettingsController = require('../controller/feed-seeting');
router.route('/feed', auth)
  .get(feedSettingsController.getFeedSetting)
  .put(feedSettingsController.modifyFeedSetting);


const profileSettingsController = require('../controller/profile-setting');
router.route('/profile', auth)
  .get(profileSettingsController.getProfileSetting)
  .put(profileSettingsController.modifyProfileSettings);

const safetyAndPrivacySettingsController = require('../controller/safety-and-privacy-setting');
router.route('/safety-privacy', auth)
  .get(safetyAndPrivacySettingsController.getSafetyAndPrivacySettings)
  .put(safetyAndPrivacySettingsController.modifySafetyAndPrivacySettings);


const emailSettingsController = require('../controller/email-setting');
router.route('/email', auth)
  .get(emailSettingsController.getEmailSetting)
  .put(emailSettingsController.modifyEmailSetting);


  const accountSettingsController = require('../controller/account-setting');  
  router.route('/account', auth)
      .get(accountSettingsController.getAccountSettings)
      .put(accountSettingsController.modifyAccountSettings)
      .delete(accountSettingsController.deleteAccount);
///////////////////////////////////////////////

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);

    if (!(await User.checkExistence(user.email, user.username))) {
      const savedUser = await user.save();
      if (!savedUser) {
        return res.status(400).send({ error: "User not saved" });
      }
      //const userObj = await User.generateUserObject(savedUser);
      const token = await savedUser.generateToken();
      const emailToken = await savedUser.generateEmailToken();
      const emailContent = `To confirm your email, click the link below: /verify-email?emailToken=${emailToken}`;
      //await sendEmail(savedUser.email, 'Please Confirm Your Email', emailContent);

      const userObj = await User.generateUserObject(savedUser);

      res.status(200).send({
        user: userObj,
        access_token: token,
        message: "User signed up successfully",
      });
    } else {
      const user = await User.getUserByEmailOrUsername(req.body.email);
      if (req.body.password && !user.password) {
        user.password = req.body.password;
        const savedUser = await user.save();
        if (!savedUser) {
          return res.status(400).send({ error: "User not saved" });
        } else {
          //const userObj = await User.generateUserObject(savedUser);
          const token = await savedUser.generateToken();
          const userObj = await User.generateUserObject(savedUser);

          res.status(200).send({
            user: userObj,
            access_token: token,
            message: "User signed up successfully",
          });
        }
      } else {
        res.status(409).send({ message: "User already exists" });
      }
    }
  } catch (err) {
    if (err.name == "ValidationError") {
      res.status(400).send(err.toString());
    } else {
      res.status(500).send(err.toString());
    }
  }
});


router.post("/login", async (req, res) => {
  const user = await User.verifyCredentials(
    req.body.username,
    req.body.password
  );

  console.log(user);

  try {
    if (user) {
      const token = await user.generateToken();
      const authTokenInfo = { token: token };
      if (req.body.remember_me) {
        authTokenInfo["token_expiration_date"] = new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000 //one month from the current time
        );
      } else {
        authTokenInfo["token_expiration_date"] = new Date(
          new Date().setHours(new Date().getHours() + 24)
        );
      }
      user.tokens = user.tokens.concat(authTokenInfo);
      await User.updateOne(
        { _id: user._id },
        { $set: { tokens: user.tokens } }
      );

      const userObj = await User.generateUserObject(user);
      res.status(200).send({
        access_token: token,
        user: userObj,
        token_expiration_date: authTokenInfo["token_expiration_date"],
        message: "User logged in successfully",
      });
    } else {
      res
        .status(401)
        .send({ message: "The credentials are invalid." });
    }
  } catch (err) {
    res.status(500).send({
      message:
        "Internal server error",
    });
  }
});

router.post('/google/oauth', verifyGoogleToken, async (req, res) => {

  try {
    const userData = req.decoded;
    console.log(userData);

    let user = await User.findOne({ googleId: userData.id });
    console.log(user);
    if (user) {
      const token = await user.generateToken();
      const authTokenInfo = { token: token };
      if (req.body.remember_me) {
        authTokenInfo["token_expiration_date"] = new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000 //one month from the current time
        );
      } else {
        authTokenInfo["token_expiration_date"] = new Date(
          new Date().setHours(new Date().getHours() + 24)
        );
      }
      user.tokens = user.tokens.concat(authTokenInfo);
      await User.updateOne(
        { _id: user._id },
        { $set: { tokens: user.tokens } }
      );

      const userObj = await User.generateUserObject(user);
      res.status(200).send({
        access_token: token,
        user: userObj,
        token_expiration_date: authTokenInfo["token_expiration_date"],
        message: "User logged in successfully",
      });

    } else {
      const newUsername = await new User().generateRandomUsername();
      const newUser = new User({
        googleId: userData.id,
        name: userData.name,
        email: userData.email,
        username: newUsername
      });

      const savedUser = await newUser.save();
      const token = await savedUser.generateToken();
      const userObj = await User.generateUserObject(savedUser);

      res.status(200).send({
        user: userObj,
        access_token: token,
        message: "User signed up successfully",
      });
    }

  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }


}
);

router.post("/forgot-password", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await User.getUserByEmailOrUsername(newUser.username);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const temp = await User.getUserByEmailOrUsername(newUser.email);
    if (!temp || temp.username !== newUser.username) {
      return res.status(400).send({ message: "Error, wrong email" });
    }
    const resetToken = await user.generateResetToken();
    const emailContent = `/reset-password-by-token?token=${resetToken}`;
    //await sendEmail(user.email, 'Ask and you shall receive.. a password reset', emailContent);
    res.status(200).send({ message: "Password reset link sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/app/forgot-password", async (req, res) => {
  try {
    const { usernameOremail } = req.body;

    if (!usernameOremail) {
      return res.status(400).send({ message: "Email or username is required" });
    }

    const user = await User.getUserByEmailOrUsername(usernameOremail);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const resetToken = await user.generateResetToken();

    const emailContent = `/reset-password-by-token?token=${resetToken}`;
    //await sendEmail(user.email, 'Ask and you shall receive.. a password reset', emailContent);

    res.status(200).send({ message: "Password reset link sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});


router.post("/reset-password-by-token", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await User.getUserByResetToken(newUser.resetToken);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (newUser && user.resetTokenExpiration > Date.now()) {
      user.password = newUser.password;
      await user.save();
      res.status(200).send({ message: "Password reset successfully" });
    } else {
      return res.status(400).send({ message: "Invalid or expired reset token" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get('/user-info', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }
    const decodedToken = jwt.jwtDecode(token);
    const userUsername = decodedToken.username;
    const user = await User.getUserByEmailOrUsername(userUsername);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { avatar, email, username } = user;
    res.status(200).json({ avatar, email, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/reset-password", async (req, res) => {
  try {

    const { token, newPassword, currentPassword } = req.body;
    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }

    const decodedToken = jwt.jwtDecode(token);
    const username = decodedToken.username;
    const user = await User.getUserByEmailOrUsername(username);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (await bcrypt.compare(currentPassword, user.password)) {
      user.password = newPassword;
      await user.save();
      res.status(200).send({ message: "Password reset successfully" });
    } else {
      return res.status(400).send({ message: "Invalid current password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/verify-email/:emailToken", async (req, res) => {
  try {
    const { emailToken } = req.params;
    if (!emailToken) {
      return res.status(401).json({ message: 'Token is required' });
    }

    const decodedToken = jwt.jwtDecode(emailToken);
    const email = decodedToken.email;
    const user = await User.getUserByEmailOrUsername(email);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.isVerified = 1;
    await user.save();
    res.status(200).send({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/check-username", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const exists = await User.getUserByEmailOrUsername(newUser.username);

    if (exists) {
      res
        .status(200).send({ available: false });
    } else {
      res
        .status(200).send({ available: true });
    }
  } catch (err) {
    res
      .status(500).send({ message: "Internal server error" });
  }
});
router.post("/forgot-username", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.getUserByEmailOrUsername(email);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const loginLink = `Your username is ${user.username} you can login now: /login`;

    //await sendEmail(user.email, 'So you wanna know your username, huh?', loginLink);

    res.status(200).send({ message: "Username sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});


module.exports = router;
