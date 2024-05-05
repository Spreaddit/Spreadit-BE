const express = require("express");
const authRoutes = require("../src/routes/auth");
const settingsRoutes = require("../src/routes/settingtest");
const app = express();
const userActionRoutes = require("../src/routes/user-action");
const postRoutes = require("../src/routes/post");
const commentRoutes = require("../src/routes/comment");
const communityRoutes = require("../src/routes/community");
const listingRoutes = require("../src/routes/listing");
const communityCommentRoutes = require("../src/routes/community-comment");
const adminRoutes = require("../src/routes/admin");
const messageRoutes = require("../src/routes/message");
const searchRoutes = require("../src/routes/search");
app.use(express.json());
//app.use(userRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(commentRoutes);
app.use(userActionRoutes);
//app.use(settingsRoutes);
app.use(postRoutes);
app.use(communityRoutes);
app.use(listingRoutes);
app.use(communityCommentRoutes);
app.use(messageRoutes);
app.use(searchRoutes);
module.exports = app;
