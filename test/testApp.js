const express = require("express");
const authRoutes = require("../src/routes/auth");
const settingsRoutes = require("../src/routes/settingtest");
const app = express();
const userActionRoutes = require("../src/routes/user-action");
//const postRoutes = require("../src/routes/post");


app.use(express.json());
//app.use(userRoutes);
app.use(authRoutes);
app.use(userActionRoutes);
app.use(settingsRoutes);
//app.use("/posts", postRoutes);
//app.use(accountSetting);
//app.use(settingsRoutes);
module.exports = app;
