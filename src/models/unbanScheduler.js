const cron = require("node-cron");
const BanUser = require("./banUser");
const User = require("./user");

async function performAutomaticUnbanning() {
  try {
    const expiredBans = await BanUser.find({
      isPermanent: false,
      banDuration: { $lte: new Date() },
    });

    for (const ban of expiredBans) {
      await User.findByIdAndUpdate(ban.userId, { isBanned: false });
      await ban.deleteOne();
    }

    console.log("Automatic unbanning task completed successfully.");
  } catch (error) {
    console.error("Error occurred during automatic unbanning task:", error);
  }
}

function startUnbanScheduler() {
  // Schedule the task to run every day at midnight (0 0 * * *)
  cron.schedule("0 0 * * *", performAutomaticUnbanning);
}

module.exports = startUnbanScheduler;
