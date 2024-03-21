const express = require("express");
const userRoutes = require("../routes/user");
const authRoutes = require("../routes/auth");
const accountSetting = require("../controller/account-setting");

const app = express();

app.use(express.json());
//app.use(userRoutes);
//app.use(authRoutes);
app.use(accountSetting);

module.exports = app;