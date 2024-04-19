//const https = require('https');
//const fs = require('fs');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./configuration");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const userActionRoutes = require("./routes/user-action");
const postsRoutes = require("./routes/post");
const uploadRoutes = require("./routes/upload-test");
const settingsRoutes = require("./routes/settings");
const mobileSettingsRoutes = require("./routes/mobile-settings");
const communityRoutes = require("./routes/community");
const commentRoutes = require("./routes/comment");
const listingRoutes = require("./routes/listing");

//seeding
const UserRoleSeeder = require("../seeders/user-role.seeder");
const PostSeeder = require("../seeders/post.seeder");
const CommentSeeder = require("../seeders/comment.seeder");
const CommunitySeeder = require("../seeders/community.seeder");
const UserSeeder = require("../seeders/user.seeder");
const RuleSeeder = require("../seeders/rule.seeder");

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
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/mobile/settings", mobileSettingsRoutes);
app.use("/api/users", userActionRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api", uploadRoutes);
app.use("/api", listingRoutes);
app.use("/api", communityRoutes);
app.use("/api", commentRoutes);
mongoose
  .connect(connectionurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Database connected successfully");

    // Seed the database
    const seeders = [
      new UserRoleSeeder(),
      new UserSeeder(),
      new CommunitySeeder(),
      new RuleSeeder(),
      new PostSeeder(),
      new CommentSeeder(),
    ];
    for (const seeder of seeders) {
      const shouldRun = await seeder.shouldRun();
      if (shouldRun) {
        console.log(`Running ${seeder.constructor.name} Seeder...`);
        await seeder.run();
        console.log(`${seeder.constructor.name} Seeder executed successfully`);

      } else {
        console.log(`${seeder.constructor.name} Seeder already executed, skipping...`); // Use backticks instead of single quotes
      }
    }

    // Start the server after seeding
    app.listen(port, () => {
      console.log("Server started on port", port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
