const express = require("express");
const authRoutes = require("../src/routes/auth");
//const settingsRoutes = require("../src/routes/feed-setting");
const app = express();
const blockRoutes = require("../src/routes/block-user");

app.use(express.json());
//app.use(userRoutes);
app.use(authRoutes);
app.use(blockRoutes);
//app.use(accountSetting);
//app.use(settingsRoutes);
module.exports = app;
