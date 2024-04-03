const express = require("express");
const User = require("../models/user.js");
const { verifyGoogleToken } = require('../middleware/authentication');
const config = require("../configuration");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const jwt = require('jwt-decode');
const router = express.Router();
router.use(passport.initialize());
router.use(cookieParser("spreaditsecret"));

