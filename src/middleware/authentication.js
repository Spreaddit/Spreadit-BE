const { compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "Spreadit-access-token-CCEC-2024");
    const user = await User.findOne({
      _id: decoded._id,
      tokens: { $elemMatch: { "tokens.token": token } },
      isVerified: true,
    });

    if (!user) {
      throw new Error();
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
      const tokenExists = newUser.tokens.includes((token) => token.token === token);
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

module.exports = authentication;
