const User = require("./../models/user");
const jwt = require("jsonwebtoken");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

exports.getAccountSettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const accountSettings = await User.findOne({ _id: userId }).select(
      "email gender country connectedAccounts"
    );
    res.status(200).json(accountSettings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.modifyAccountSettings = async (req, res) => {
  try {
    const userId = req.user._id;

    const { email, gender, country, connectedAccounts } = req.body;

    if (email && !isValidEmail(email)) {
      return res.status(403).json({ error: "Invalid email format" });
    }

    if (connectedAccounts && !Array.isArray(connectedAccounts)) {
      return res
        .status(403)
        .json({ error: "connectedAccounts must be an array" });
    }
    if (connectedAccounts) {
      for (const acc of connectedAccounts) {
        if (!isValidEmail(acc)) {
          return res
            .status(403)
            .json({ error: `${acc} is not a valid email format` });
        }
      }
    }
    const updatedFields = {};
    if (email) {
      updatedFields.email = email;
    }
    if (gender) {
      updatedFields.gender = gender;
    }
    if (country) {
      updatedFields.country = country;
    }
    if (connectedAccounts) {
      updatedFields.connectedAccounts = connectedAccounts;
    }

    await User.findOneAndUpdate({ _id: userId }, { $set: updatedFields });

    res.status(200).json({ message: "Successful update" });
  } catch (err) {
    console.error("Error modifying account settings", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    await User.deleteOne({ _id: userId });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBlockingSetting = async (req, res) => {
  try {
    const userId = req.user._id;
    const blockingSetting = await User.findOne({ _id: userId })
      .select("blockedUsers allowFollow")
      .populate({
        path: "blockedUsers",
        select: "_id username avatar",
      });
    res.status(200).json(blockingSetting);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.modifyBlockingSetting = async (req, res) => {
  try {
    const userId = req.user._id;
    const { blockedUsername, allowFollow } = req.body;
    let blockedUserId = null;
    if (blockedUsername) {
      const blockedUser = await User.findOne({ username: blockedUsername });
      if (!blockedUser) {
        return res.status(404).json({ error: "Blocked user not found" });
      }
      blockedUserId = blockedUser._id;
    }

    const blockingSetting = await User.findOne({ _id: userId });

    if (
      blockedUserId &&
      !blockingSetting.blockedUsers.includes(blockedUserId)
    ) {
      blockingSetting.blockedUsers.push(blockedUserId);
    }

    if (allowFollow !== undefined) {
      blockingSetting.allowFollow = allowFollow;
    }

    await blockingSetting.save();
    res.status(200).json({ message: "Successful update" });
  } catch (err) {
    console.error("Error modifying blocking Setting", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getContactSetting = async (req, res) => {
  try {
    const userId = req.user._id;
    const contactSetting = await User.findOne({ _id: userId }).select(
      "inboxMessages chatMessages chatRequests mentions commentsOnYourPost commentsYouFollow upvotes repliesToComments newFollowers cakeDay modNotifications"
    );
    res.status(200).json(contactSetting);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};

exports.modifyContactSetting = async (req, res) => {
  try {
    const userId = req.user._id;
    const allowedFields = [
      "inboxMessages",
      "chatMessages",
      "chatRequests",
      "mentions",
      "commentsOnYourPost",
      "commentsYouFollow",
      "upvotes",
      "repliesToComments",
      "newFollowers",
      "cakeDay",
      "modNotifications",
    ];
    const modifyContactSetting = req.body;

    const filteredModifyContactSetting = {};
    Object.keys(modifyContactSetting).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredModifyContactSetting[key] = modifyContactSetting[key];
      }
    });
    const contactSetting = await User.findOneAndUpdate(
      { _id: userId },
      { $set: filteredModifyContactSetting },
      { new: true }
    );

    res.status(200).json({ message: "Successful update" });
  } catch (err) {
    console.error("Error modifying contact settings", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
