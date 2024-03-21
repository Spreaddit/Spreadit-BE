const express = require("express");
const User = require("../models/user.js");
const auth = require("../middleware/authentication");
const config = require("../configuration");
const cookieParser = require("cookie-parser");
const sendEmail = require('../models/send-email.js');

const router = express.Router();


router.post("/signup", async (req, res) => {
    try {
      const user = new User(req.body);
  
      if (!(await User.checkExistence(user.email, user.username))) {
        const savedUser = await user.save();
        if (!savedUser) {
          return res.status(400).send({ error: "User not saved" });
        }
        const userObj = await User.generateUserObject(savedUser);
        res.status(200).send({
          user: userObj,
          message: "User Signed up successfully",
        });
      } else {
        const user = await User.getUserByEmailOrUsername(req.body.email);
        if (req.body.password && !user.password) {
          user.password = req.body.password;
          const savedUser = await user.save();
          if (!savedUser) {
            return res.status(400).send({ error: "User not saved" });
          } else {
            const userObj = await User.generateUserObject(savedUser);
            res.status(200).send({
              user: userObj,
              message: "Sign up is complete and password was added successfully",
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
          "The server crashed :)",
      });
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
    await sendEmail(user.email, 'Ask and you shall receive.. a password reset', emailContent);
    res.status(200).send({ message: "Password reset link sent successfully" });
  } catch (err) {
    console.log(err);
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
      if (newUser.password.length < 8) {
        return res.status(400).send({ message: "Password must be at least 8 characters" });
      }
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
    const decodedToken = jwt_decode(token);
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
    const decodedToken = jwt_decode(token);
    const username = decodedToken.username;
    const user = await User.getUserByEmailOrUsername(username);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if(await bcrypt.compare(currentPassword, user.password)) {
    user.password = newPassword;
    await user.save();
    res.status(200).send({ message: "Password reset successfully" });
    }else{
      return res.status(400).send({ message: "Invalid current password" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});


router.post("/check-username", async (req, res) => {
  try {
      const newUser = new User(req.body);
      const exists = await User.getUserByEmailOrUsername(newUser.username);

      if (exists) {
          res
          .status(400).send({ available: false });
      } else {
          res
          .status(200).send({ available: true });
      }
  } catch (err) {
      res
      .status(500).send({ message: "Internal server error" });
  }
});


  module.exports = router;
