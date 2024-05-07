const User = require("../models/user.js");
const Community = require("../models/community.js");
const auth = require("../middleware/authentication");
const config = require("../configuration");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const sendEmail = require("../models/send-email.js");
const jwt = require("jwt-decode");
const jwt1 = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const upload = require("../service/fileUpload");
const { uploadMedia } = require("../service/cloudinary.js");

exports.signUp = async (req, res) => {
  try {
    const user = new User(req.body);
    const isCross = req.body.is_cross;
    if (!(await User.checkExistence(user.email, user.username))) {
      const savedUser = await user.save();
      if (!savedUser) {
        return res.status(400).send({ error: "User not saved" });
      }
      const emailToken = await savedUser.generateEmailToken();
      let emailContent;
      if (isCross) {
        emailContent = `To confirm your email, click the link below: app.spreaddit.me/#/home/${emailToken}`;
      } else {
        emailContent = `To confirm your email, click the link below: www.spreaddit.me/verifyemail/${emailToken}`;
      }
      await sendEmail(
        savedUser.email,
        "Please Confirm Your Email",
        emailContent
      );
      res.status(200).send({
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
          res.status(200).send({
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
};
exports.logIn = async (req, res) => {
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
      if (user.isBanned) {
        return res.status(402).send({ message: "The user is banned" });
      }
      const userObj = await User.generateUserObject(user);
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
};
exports.googleOauth = async (req, res) => {
  try {
    const userData = req.decoded;
    let user = await User.findOne({ googleId: userData.id });
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
      if (user.isBanned) {
        return res.status(402).send({ message: "The user is banned" });
      }
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
        isVerified: true,
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
};
exports.googleConnectedAccounts = async (req, res) => {
  try {
    const userData = req.decoded;
    const userId = req.user._id;
    let user = await User.findById(userId);

    if (user) {
      user.googleId = userData.id;
      user.connectedAccounts = [userData.email];
      user.isVerified = true;

      const savedUser = await user.save();
      const userObj = await User.generateUserObject(savedUser);

      res.status(200).send({
        user: userObj,
        message: "Connected Accounts has been added successfully",
      });
    } else {
      res.status(400).send({
        message: "Invalid User data",
      });
    }
  } catch (error) {
    console.error("Error during token verification:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.addPasswordSendEmail = async (req, res) => {
  try {
    const userId = req.user._id;
    let user = await User.findById(userId);
    const isCross = req.body.is_cross;
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user && user.googleId !== " ") {
      const emailToken = await user.generateEmailToken();
      let emailContent;
      if (isCross) {
        emailContent = `To confirm your email, click the link below: app.spreaddit.me/#/settings/account-settings/add-password/${emailToken}`;
      } else {
        emailContent = `To confirm your email, click the link below: www.spreaddit.me/addpassword/${emailToken}`;
      }
      await sendEmail(
        user.connectedAccounts[0],
        "Please Confirm Your Email",
        emailContent
      );

      res.status(200).send({
        message: "email for adding the passowrd is sent successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
exports.addPasswordConnectedAccounts = async (req, res) => {
  try {
    const userId = req.user._id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user && user.googleId !== " ") {
      user.email = user.connectedAccounts[0];
      user.password = req.body.password;
      await user.save();
      res.status(200).send({ message: "Password added successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).send({ message: "Email or username is required" });
    }

    const user = await User.getUserByEmailOrUsername(email);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const temp = await User.getUserByEmailOrUsername(email);
    if (!temp || temp.username !== user.username) {
      return res.status(400).send({ message: "Error, wrong email" });
    }
    const resetToken = await user.generateEmailToken();
    const emailContent = `www.spreaddit.me/password/${resetToken}`;
    await sendEmail(
      user.email,
      "Ask and you shall receive.. a password reset",
      emailContent
    );
    res.status(200).send({ message: "Password reset link sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
exports.appForgotPassword = async (req, res) => {
  try {
    const { usernameOremail } = req.body;

    if (!usernameOremail) {
      return res.status(400).send({ message: "Email or username is required" });
    }

    const user = await User.getUserByEmailOrUsername(usernameOremail);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const resetToken = await user.generateEmailToken();

    const emailContent = `app.spreaddit.me/#/forget-password-verification/${resetToken}`;
    await sendEmail(
      user.email,
      "Ask and you shall receive.. a password reset",
      emailContent
    );

    res.status(200).send({ message: "Password reset link sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
exports.resetPasswordByToken = async (req, res) => {
  try {
    const { emailToken } = req.body;
    const decodedToken = jwt.jwtDecode(emailToken);
    const email = decodedToken.email;
    const user = await User.getUserByEmailOrUsername(email);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user) {
      user.password = req.body.password;
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
};
exports.resetPasswordUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { avatar, email, username } = user;
    res.status(200).json({ avatar, email, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.resetPassword = async (req, res) => {
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
};
exports.verifyEmail = async (req, res) => {
  try {
    const { emailToken } = req.params;
    if (!emailToken) {
      return res.status(401).json({ message: "Token is required" });
    }
    const decoded = jwt1.verify(emailToken, "Spreadit-access-token-CCEC-2024", {
      algorithms: ["HS256"],
    });
    const user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const accessToken = await user.generateToken();
    user.isVerified = 1;
    await user.save();
    const userObj = await User.generateUserObject(user);
    res.status(200).send({
      user: userObj,
      message: "Email verified successfully",
      accessToken: accessToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const exists = await User.getUserByEmailOrUsername(username);

    if (exists) {
      res.status(200).send({ available: false });
    } else {
      res.status(200).send({ available: true });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.forgotUsername = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.getUserByEmailOrUsername(email);
    const isCross = req.body.is_cross;

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    let emailContent;
    if (isCross) {
      emailContent = `Your username is ${user.username} you can login now: app.spreaddit.me/login`;
    } else {
      emailContent = `Your username is ${user.username} you can login now: www.spreaddit.me/login`;
    }
    await sendEmail(
      user.email,
      "So you wanna know your username, huh?",
      emailContent
    );
    res.status(200).send({ message: "Username sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
exports.getUserInfo = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select(
        "username name avatar banner about createdAt subscribedCommunities isVisible isActive socialLinks"
      )
      .populate({
        path: "subscribedCommunities",
        select: "name image communityBanner membersCount",
      })
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: user.username,
      name: user.name,
      avatar: user.avatar,
      banner: user.banner,
      about: user.about,
      createdAt: user.createdAt,
      subscribedCommunities: user.subscribedCommunities,
      isVisible: user.isVisible,
      isActive: user.isActive,
      socialLinks: user.socialLinks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateUserInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      name,
      about,
      socialLinks,
      username,
      isVisible,
      isActive,
      fileType,
    } = req.body;
    let avatar = null;
    let banner = null;
    if (req.files && req.files["avatar"]) {
      avatar = req.files["avatar"][0];
    }
    if (req.files && req.files["banner"] && req.files["banner"][0]) {
      banner = req.files["banner"][0];
    }
    let avatarUrl, bannerUrl;

    if (avatar) {
      const avatarResult = await uploadMedia(avatar, "image");
      avatarUrl = avatarResult.secure_url;
    }
    if (banner) {
      const bannerResult = await uploadMedia(banner, "image");
      bannerUrl = bannerResult.secure_url;
    }
    const user = await User.findById(userId).populate(
      "subscribedCommunities",
      "name description image communityBanner membersCount"
    );

    if (username) {
      const exists = await User.getUserByEmailOrUsername(username);
      if (exists) {
        if (exists.username != user.username || username.length > 14) {
          return res.status(400).json({ message: "Username not available" });
        }
      }
    }

    if (name) user.name = name;
    if (avatarUrl) user.avatar = avatarUrl;
    if (bannerUrl) user.banner = bannerUrl;
    if (about) user.about = about;
    if (socialLinks) user.socialLinks = socialLinks;
    if (username) user.username = username;
    if (typeof isVisible === "boolean") user.isVisible = isVisible;
    if (typeof isActive === "boolean") user.isActive = isActive;

    await user.save();

    res.status(200).json({
      username: user.username,
      name: user.name,
      avatar: user.avatar,
      banner: user.banner,
      about: user.about,
      createdAt: user.createdAt,
      subscribedCommunities: user.subscribedCommunities,
      isVisible: user.isVisible,
      isActive: user.isActive,
      socialLinks: user.socialLinks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
