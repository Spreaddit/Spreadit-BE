const express = require("express");
const User = require("../models/user.js");
const auth = require("../middleware/authentication");
const config = require("../configuration");
const cookieParser = require("cookie-parser");

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
        const { email, username } = req.body;
        const user = await User.getUserByEmailOrUsername(email || username);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        await user.generateResetCode();

        res.status(200).send({ message: "Reset password code sent successfully" });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});

router.post("/verify-reset-code", async (req, res) => {
  try {
      const { email, verificationCode } = req.body;
      
      const user = await User.getUserByEmailOrUsername(email);

      if (!user) {
          return res.status(404).send({ message: "User not found" });
      }

      if (user.verificationCode === verificationCode && user.verificationCodeExpiration > Date.now()) {
          res.status(200).send({ message: "Verification code is valid. You can reset your password now." });
      } else {
          res.status(400).send({ message: "Invalid or expired verification code" });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/reset-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        
        const user = await User.getUserByEmailOrUsername(email);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({ message: "Password reset successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    }
});

router.post("/check-username", async (req, res) => {
  try {
      const { username } = req.body;
      
      const exists = await User.getUserByEmailOrUsername(username);

      if (exists) {
          res.status(200).send({ available: false });
      } else {
          res.status(200).send({ available: true });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
  }
});


  module.exports = router;
