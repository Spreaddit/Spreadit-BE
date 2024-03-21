const express = require("express");
const User = require("../models/user.js");
const auth = require("../middleware/authentication");
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
        "The server crashed :)",
    });
  }
});

router.use('/auth/google/callback', (req, res, next) => {
  console.log('Received request at /auth/google/callback:', req.url);
  next();
});
passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: "https://localhost/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log('Received Google profile:', profile);
        req.user = await User.googleAuth(profile);
        return done(null, profile);
      } catch (err) {
        //return cb(err, profile);
        console.error('Error in Google authentication:', err);
        return done(null, profile);
      }
    }
  )
);
  
router.get("/auth/google",
  passport.authenticate("google", {
    scope: ["openid", "email", "profile"],
    session: false,
  })
);
  
router.get(
  "/auth/google/callback",

  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const user = new User(req.user);
      console.log(user); 
      if (user) {
        const token = await user.generateToken();
        const authTokenInfo = { token: token };
        if (req.body.remember_me) {
          authTokenInfo["token_expiration_date"] = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
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
        res.cookie(
          "res",
          {
            access_token: token,
            user: userObj,
            token_expiration_date: authTokenInfo["token_expiration_date"],
            message: "User logged in successfully",
            status: 200,
          },
          { domain: "localhost" }
        );
        res.redirect("http://localhost/GoogleRedirect");
      } else {
        req.cookie(
          "res",
          {
            status: 401,
            message: "The enetered credentials are invalid.",
          },
          { domain: "localhost" }
        );
        res.redirect("http://localhost/GoogleRedirect");
      }
    } catch (err) {
      console.error('Error in Google callback endpoint:', err);
      req.cookie(
        "res",
        {
          status: 500,
          message:
            "The server encountered an unexpected condition which prevented it from fulfilling the request.",
        },
        { domain: "localhost" }
      );
      res.status(500).send({
        message:
          "The server encountered an unexpected condition which prevented it from fulfilling the request.",
      });
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
    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }  
    const decodedToken =  jwt.jwtDecode(token);
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
   
    const decodedToken =  jwt.jwtDecode(token);
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
    console.log(err);
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
router.post("/forgot-username", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.getUserByEmailOrUsername(email);
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const loginLink = `Your username is ${user.username} you can login now: /login`;

    await sendEmail(user.email, 'So you wanna know your username, huh?', loginLink);

    res.status(200).send({ message: "Username sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});


  module.exports = router;
