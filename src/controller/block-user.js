const BlockUser = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();

exports.router.route("/").post(auth, this.blockUser);
exports.blockUser = async (req, res) => {
  //const user = req.user;

  try {
    const toBlockUser = req.body;
    const { toBlockID } = toBlockUser;
    console.log("Searching for user with ID:", toBlockID);
    const toBlocked = await BlockUser.findOne({ _id: toBlockID });
    if (!toBlocked) {
      console.error("this user not found:");
      return res.status(404).json({ error: "User not found" });
    }

    router.post("/user/block", auth, async (req, res) => {
      const user = req.user;
      const { blockingID } = user;
      const blocking = await BlockUser.findOne({ _id: blockingID });
      if (!blocking) {
        console.error("please login first:");
        return res.status(404).json({ error: "User not found" });
      }

      if (blocking.blockedUsers.includes(toBlockID)) {
        console.error("you already block this user");
        return res.status(404).json({ error: "you already block this user" });
      }
      blocking.blockedUsers.push(toBlockID);
      const response = {
        status: "success",
      };
      res.status(200).json(response);
    });
  } catch (err) {
    console.error("Error block user", err);
    res.status(500).json({ error: "Internal server error" });
  }

  // try {
  //   const modifiedAccountSetting = req.body;
  //   const { email } = modifiedAccountSetting;
  //   console.log("Searching for account setting with email:", email);
  //   const emailAccountSetting = await AccountSetting.findOne({ email });
  //   if (!emailAccountSetting) {
  //     console.error("Account setting not found for email:", email);
  //     return res.status(404).json({ error: "Account setting not found" });
  //   }
  //   if (modifiedAccountSetting.password) {
  //     emailAccountSetting.password = modifiedAccountSetting.password;
  //   }
  //   if (modifiedAccountSetting.gender) {
  //     emailAccountSetting.gender = modifiedAccountSetting.gender;
  //   }
  //   if (modifiedAccountSetting.country) {
  //     emailAccountSetting.country = modifiedAccountSetting.country;
  //   }

  //   await emailAccountSetting.save();
  //   const response = {
  //     gender: emailAccountSetting.gender,
  //     country: emailAccountSetting.country,
  //   };
  //   res.status(200).json(response);
  // } catch (err) {
  //   console.error("Error modifying account settings", err);
  //   res.status(500).json({ error: "Internal server error" });
  // }
};
