const { compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "Spreadit-access-token-CCEC-2024", {
      algorithms: ["HS256"],
    });
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
      isVerified: true,
    });
    if (!user) {
      throw new Error();
    }
    if (user.isBanned === true) {
      res.status(401).send({ message: "The user is banned" });
    }
    //get all expired tokens
    const expiredTokens = user.tokens.filter(
      (token) => token.token_expiration_date <= Date.now()
    );

    const oldTokens = user.tokens;
    //Remove expired tokens
    expiredTokens.forEach((token) => {
      user.tokens = user.tokens.filter((t) => t.token !== token.token);
    });
    let userSend = user;
    if (oldTokens.length !== user.tokens.length) {
      const newUser = await User.updateOne(
        { _id: user._id },
        { $set: { tokens: user.tokens } },
        { new: true }
      );

      //check if token is present in user tokens
      const tokenExists = newUser.tokens.includes(
        (token) => token.token === token
      );
      if (!tokenExists) {
        throw new Error();
      }
      userSend = newUser;
    }
    res.set("Access-Control-Allow-Origin", "*");
    req.user = userSend;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ message: e.toString() });
  }
};

const verifyGoogleToken = async (req, res, next) => {
  const token = req.body.googleToken;
  if (!token) {
    return res.status(401).json({ message: "unauthorized user" });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    req.decoded = response.data;
    next();
  } catch (error) {
    console.error("Error verifying the google token", error);
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { authentication, verifyGoogleToken };
