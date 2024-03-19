const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./configuration");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const accountSettingRoutes = require("./routes/account-setting");
// const blockUserRoutes = require("./routes/block-user");
const followUserRoutes = require("./routes/follow-user");

const app = express();
const port = 80;
const connectionurl = config.cloudConnectString;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(authRoutes);
app.use("/setting", accountSettingRoutes);
// app.use("/users/follow/", followUserRoutes);
// app.use("/user/block", blockUserRoutes);

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
