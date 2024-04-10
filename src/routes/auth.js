const express = require("express");
const User = require("../models/user.js");
const Community = require("../models/community.js");
const axios = require("axios");
//const auth = require("../middleware/authentication");
const { verifyGoogleToken } = require("../middleware/authentication");
const config = require("../configuration");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const sendEmail = require("../models/send-email.js");
const jwt = require("jwt-decode");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/authentication");
const router = express.Router();
router.use(passport.initialize());
//const express = require('express');
//router.use(passport.session());
router.use(cookieParser("spreaditsecret"));

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    const userAvatar =
      "https://drive.google.com/file/d/1130pQbYOHFVRl8Y381KoneRzpKoGUvzl/view?usp=sharing";
    user.avatar = userAvatar;
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
      console.log(user);

      const userObj = await User.generateUserObject(user);
      //console.log(userObj);
      res.status(200).send({
        access_token: token,
        user: userObj,
        token_expiration_date: authTokenInfo["token_expiration_date"],
        message: "User logged in successfully",
      });
    } else {
      res.status(401).send({ message: "The credentials are invalid." });
    }
  } catch (err) {
    res.status(500).send({
      message: "The server crashed :)",
    });
  }
});

router.post("/google/oauth", verifyGoogleToken, async (req, res) => {
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
        connectedAccounts: [userData.email],
        name: userData.name,
        username: newUsername,
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
    console.error("Error during token verification:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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
      return res
        .status(400)
        .send({ message: "Invalid or expired reset token" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/reset-password/user-info", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    const decodedToken = jwt.jwtDecode(token);
    const userUsername = decodedToken.username;
    const user = await User.getUserByEmailOrUsername(userUsername);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { avatar, email, username } = user;
    res.status(200).json({ avatar, email, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/reset-password", auth.authentication, async (req, res) => {
  try {
    const { token, newPassword, currentPassword } = req.body;
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    const userId = req.user._id;
    const user = await User.findById(userId);
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
      return res.status(401).json({ message: "Token is required" });
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
      res.status(200).send({ available: false });
    } else {
      res.status(200).send({ available: true });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
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
router.get("/user/profile-info/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select(
        "username name avatar banner about createdAt subscribedCommunities socialLinks"
      )
      .populate({
        path: "subscribedCommunities",
        select: "name image communityBanner",
      })
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedCommunities = await Promise.all(
      user.subscribedCommunities.map(async (communityId) => {
        const membersCount = await Community.getMembersCount(communityId);
        const community = await Community.findById(communityId).select(
          "name image communityBanner"
        );
        return { ...community.toObject(), membersCount };
      })
    );

    user.subscribedCommunities = updatedCommunities;

    res.status(200).json({
      username: user.username,
      name: user.name,
      avatar: user.avatar,
      banner: user.banner,
      about: user.about,
      createdAt: user.createdAt,
      subscribedCommunities: user.subscribedCommunities,
      socialLinks: user.socialLinks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/user/profile-info", auth.authentication, async (req, res) => {
  try {
    const userId = req.user._id;
    const { avatar, banner, about, socialLinks } = req.body;

    const updatedFields = {};
    if (avatar) updatedFields.avatar = avatar;
    if (banner) updatedFields.banner = banner;
    if (about) updatedFields.about = about;
    if (socialLinks) updatedFields.socialLinks = socialLinks;
    if (req.body.username) {
      const exists = await User.getUserByEmailOrUsername(req.body.username);
      if (exists) {
        return res.status(400).json({ message: "Username not available" });
      }
      updatedFields.username = req.body.username;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: updatedUser.username,
      avatar: updatedUser.avatar,
      banner: updatedUser.banner,
      about: updatedUser.about,
      createdAt: updatedUser.createdAt,
      followers: updatedUser.followers,
      followings: updatedUser.followings,
      communities: updatedUser.communities,
      socialLinks: updatedUser.socialLinks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
