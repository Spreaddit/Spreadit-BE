//const https = require('https');
//const fs = require('fs');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./configuration");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const createCommunityRoutes = require("./routes/create-community");
const userActionRoutes = require("./routes/user-action");
const postsRoutes = require("./routes/post");
const uploadRoutes = require("./routes/upload-test");
const settingsRoutes = require("./routes/settings");
const mobileSettingsRoutes = require("./routes/mobile-settings");
const homepageRoutes = require("./routes/homepage");
const listingRoutes = require("./routes/listing");


//seeding
const UserRoleSeeder = require("../seeders/user-role.seeder");
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
app.use("/users", userActionRoutes);
app.use("/posts", postsRoutes);
app.use("/", uploadRoutes);
app.use("/", listingRoutes);
app.use(homepageRoutes);

mongoose
  .connect(connectionurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Database connected successfully");

    // Seed the database
    const userRoleSeeder = new UserRoleSeeder();
    const shouldRun = await userRoleSeeder.shouldRun();

    if (shouldRun) {
      console.log('Running Seeder...');
      await userRoleSeeder.run();
      console.log('Seeder executed successfully');
    } else {
      console.log('Seeder already executed, skipping...');
    }

    // Start the server after seeding
    app.listen(port, () => {
      console.log("Server started on port", port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
// // Create HTTPS server
// https.createServer(options, app).listen(port, () => {
//   console.log("Server started on port", port);
// });
