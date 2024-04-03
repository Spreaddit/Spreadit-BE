//const https = require('https');
//const fs = require('fs');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./configuration");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const createCommunityRoutes = require("./routes/create-community");
const blockUserRoutes = require("./routes/block-user");
const followUserRoutes = require("./routes/follow-user");
const unfollowUserRoutes = require("./routes/unfollow-user");
const reportUserRoutes = require("./routes/report-user");
const showFriendRoutes = require("./routes/show-friend-information");
const postsRoutes = require("./routes/post");
const uploadRoutes = require("./routes/upload-test");
const settingsRoutes = require("./routes/settings");
const mobileSettingsRoutes = require("./routes/mobile-settings");

const listingRoutes = require("./routes/listing");

const app = express();
const port = 80;
//const port = 443;
const connectionurl = config.cloudConnectString;

// const options = {
//   key: fs.readFileSync('path/to/private.key'),
//   cert: fs.readFileSync('path/to/certificate.crt')
// };

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(authRoutes);
app.use("/auth", authRoutes);
app.use("/settings", settingsRoutes);
app.use("/mobile/settings", mobileSettingsRoutes);
app.use("/", createCommunityRoutes);
app.use("/users", followUserRoutes);
app.use("/users", unfollowUserRoutes);
app.use("/users", blockUserRoutes);
app.use("/users", reportUserRoutes);
app.use("/users", showFriendRoutes);
app.use("/posts", postsRoutes);
app.use("/", uploadRoutes);
app.use("", listingRoutes);
mongoose
  .connect(connectionurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.listen(port, () => {
  console.log("Server started on port", port);
});

// // Create HTTPS server
// https.createServer(options, app).listen(port, () => {
//   console.log("Server started on port", port);
// });
