const express = require("express");
const authRoutes = require("../src/routes/auth");
//const settingsRoutes = require("../src/routes/feed-setting");
const app = express();

app.use(express.json());
//app.use(userRoutes);
app.use(authRoutes);
//app.use(accountSetting);
//app.use(settingsRoutes);
module.exports = app;