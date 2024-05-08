const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./configuration");
const authRoutes = require("./routes/auth");
const userActionRoutes = require("./routes/user-action");
const moderatorRoutes = require("./routes/moderator");
const postsRoutes = require("./routes/post");
const settingsRoutes = require("./routes/settings");
const mobileSettingsRoutes = require("./routes/mobile-settings");
const communityRoutes = require("./routes/community");
const commentRoutes = require("./routes/comment");
const listingRoutes = require("./routes/listing");
const messageRoutes = require("./routes/message");
const startUnbanScheduler = require("./models/unbanScheduler");
const searchRoutes = require("./routes/search");
const communitiespostsRoutes = require("./routes/community-post");
const adminRoutes = require("./routes/admin");
const communityCommentsRoutes = require("./routes/community-comment");
const notificationsRoutes = require("../src/routes/notifications");
const banInviteRoutes = require("../src/routes/ban-invite");

//seeding
const UserRoleSeeder = require("../seeders/user-role.seeder");
const notificationTypeSeeder = require("../seeders/notification-type.seeder");
const PostSeeder = require("../seeders/post.seeder");
const CommentSeeder = require("../seeders/comment.seeder");
const CommunitySeeder = require("../seeders/community.seeder");
const UserSeeder = require("../seeders/user.seeder");
const RuleSeeder = require("../seeders/rule.seeder");
const ModeratorSeeder = require("../seeders/moderator.seeder");
const RemovalReasonSeeder = require("../seeders/removalreason.seeder");
const MessageSeeder = require("../seeders/message.seeder");
const ConversationSeeder = require("../seeders/conversation.seeder");

const app = express();
const port = 5300;
const connectionurl = config.cloudConnectString;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
startUnbanScheduler();
app.use("/api", communityRoutes);
app.use("/api", moderatorRoutes);
app.use("/api", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/mobile/settings", mobileSettingsRoutes);
app.use("/api/users", userActionRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api", listingRoutes);
app.use("/api", commentRoutes);
app.use("/api", messageRoutes);
app.use("/api/search", searchRoutes);
app.use("/api", communitiespostsRoutes);
app.use("/api", adminRoutes);
app.use("/api", communityCommentsRoutes);
app.use("/api", notificationsRoutes);
app.use("/api", banInviteRoutes);
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
      new notificationTypeSeeder(),
      new UserSeeder(),
      new CommunitySeeder(),
      new RuleSeeder(),
      new PostSeeder(),
      new CommentSeeder(),
      new ModeratorSeeder(),
      new RemovalReasonSeeder(),
      new ConversationSeeder(),
      new MessageSeeder(),
    ];
    for (const seeder of seeders) {
      const shouldRun = await seeder.shouldRun();
      if (shouldRun) {
        console.log(`Running ${seeder.constructor.name} Seeder...`);
        await seeder.run();
        console.log(`${seeder.constructor.name} Seeder executed successfully`);
      } else {
        console.log(
          `${seeder.constructor.name} Seeder already executed, skipping...`
        );
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
