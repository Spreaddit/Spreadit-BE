const Message = require("./../models/message");
const Community = require("./../models/community");
const User = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadMedia } = require("../service/cloudinary.js");

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

exports.getChatAndMessagingSetting = async (req, res) => {
  try {
    const userId = req.user._id;
    const chatAndMessagingSetting = await User.findOne({ _id: userId }).select(
      "sendYouFriendRequests sendYouPrivateMessages approvedUsers"
    );
    res.status(200).json(chatAndMessagingSetting);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};

exports.modifyChatAndMessagingSetting = async (req, res) => {
  try {
    const userId = req.user._id;

    const { sendYouFriendRequests, sendYouPrivateMessages, approvedUsers } =
      req.body;

    const updatedFields = {};
    if (sendYouFriendRequests !== undefined) {
      updatedFields.sendYouFriendRequests = sendYouFriendRequests;
    }
    if (sendYouPrivateMessages !== undefined) {
      updatedFields.sendYouPrivateMessages = sendYouPrivateMessages;
    }
    if (approvedUsers !== undefined) {
      updatedFields.approvedUsers = approvedUsers;
    }

    await User.findOneAndUpdate({ _id: userId }, { $set: updatedFields });

    res.status(200).json({ message: "Successful update" });
  } catch (err) {
    console.error("Error modifying chatAndMessaging settings", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.makeAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedMessages = await Message.updateMany(
      { userId },
      { isRead: "true" }
    );

    res.status(200).json(updatedMessages);
  } catch (err) {
    console.error("Error updating message status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEmailSetting = async (req, res) => {
  try {
    const userId = req.user._id;
    const emailSetting = await User.findOne({ _id: userId }).select(
      "newFollowerEmail chatRequestEmail unsubscribeAllEmails"
    );
    res.status(200).json(emailSetting);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};

exports.modifyEmailSetting = async (req, res) => {
  try {
    const userId = req.user._id;

    const { newFollowerEmail, chatRequestEmail, unsubscribeAllEmails } =
      req.body;

    const updatedFields = {};
    if (newFollowerEmail !== undefined) {
      updatedFields.newFollowerEmail = newFollowerEmail;
    }
    if (chatRequestEmail !== undefined) {
      updatedFields.chatRequestEmail = chatRequestEmail;
    }
    if (unsubscribeAllEmails !== undefined) {
      updatedFields.unsubscribeAllEmails = unsubscribeAllEmails;
    }
    await User.findOneAndUpdate({ _id: userId }, { $set: updatedFields });

    res.status(200).json({ message: "Successful update" });
  } catch (err) {
    console.error("Error modifying email settings", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getFeedSetting = async (req, res) => {
  try {
    const userId = req.user._id;
    const feedSetting = await User.findOne({ _id: userId }).select(
      "adultContent autoplayMedia communityThemes communityContentSort globalContentView openPostsInNewTab"
    );
    res.status(200).json(feedSetting);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};

exports.modifyFeedSetting = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      adultContent,
      autoplayMedia,
      communityThemes,
      communityContentSort,
      globalContentView,
      openPostsInNewTab,
    } = req.body;

    const updatedFields = {};
    if (adultContent !== undefined) {
      updatedFields.adultContent = adultContent;
    }
    if (autoplayMedia !== undefined) {
      updatedFields.autoplayMedia = autoplayMedia;
    }
    if (communityThemes !== undefined) {
      updatedFields.communityThemes = communityThemes;
    }
    if (communityContentSort !== undefined) {
      updatedFields.communityContentSort = communityContentSort;
    }
    if (globalContentView !== undefined) {
      updatedFields.globalContentView = globalContentView;
    }
    if (openPostsInNewTab !== undefined) {
      updatedFields.openPostsInNewTab = openPostsInNewTab;
    }

    await User.findOneAndUpdate({ _id: userId }, { $set: updatedFields });

    res.status(200).json({ message: "Successful update" });
  } catch (err) {
    console.error("Error modifying feed settings", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.checkPasswordMatch = async (req, res) => {
  try {
    const userId = req.user._id;
    const enteredPassword = req.body.enteredPassword;
    const user = await User.findOne({ _id: userId }).select("password");
    const passwordMatch = await bcrypt.compare(enteredPassword, user.password);
    if (passwordMatch) {
      res.status(200).json({ message: "Password matches" });
    } else {
      res.status(401).json({ error: "Current password is incorrect" });
    }
  } catch (err) {
    console.error("Error checking password match:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProfileSetting = async (req, res) => {
  try {
    const userId = req.user._id;
    const profileSettings = await User.findOne({ _id: userId }).select(
      "displayName about socialLinks avatar banner nsfw allowFollow contentVisibility activeInCommunityVisibility clearHistory"
    );
    res.status(200).json(profileSettings);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};

exports.modifyProfileSettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const {
      displayName,
      about,
      socialLinks,
      nsfw,
      allowFollow,
      contentVisibility,
      activeInCommunityVisibility,
      clearHistory,
    } = req.body;

    const avatar = req.files["avatar"] ? req.files["avatar"][0] : null;
    const banner = req.files["banner"] ? req.files["banner"][0] : null;
    const updatedFields = {};
    if (displayName !== undefined) {
      user.displayName = displayName;
    }
    if (about !== undefined) {
      user.about = about;
    }
    if (socialLinks !== undefined) {
      const parsedSocialLinks = JSON.parse(socialLinks);
      user.socialLinks = parsedSocialLinks;
    }
    if (avatar) {
      const avatarResult = await uploadMedia(avatar, "image");
      const avatarUrl = avatarResult.secure_url;
      user.avatar = avatarUrl;
    }
    if (banner) {
      const bannerResult = await uploadMedia(banner, "image");
      const bannerUrl = bannerResult.secure_url;
      user.banner = bannerUrl;
    }
    if (nsfw !== undefined) {
      user.nsfw = nsfw;
    }
    if (allowFollow !== undefined) {
      user.allowFollow = allowFollow;
    }
    if (contentVisibility !== undefined) {
      user.contentVisibility = contentVisibility;
    }
    if (activeInCommunityVisibility !== undefined) {
      user.activeInCommunityVisibility = activeInCommunityVisibility;
    }
    if (clearHistory !== undefined) {
      user.clearHistory = clearHistory;
    }

    await user.save();
    const userObj = await User.generateUserObject(user);
    res.status(200).json({ userObj: userObj, message: "Successful update" });
  } catch (err) {
    console.error("Error modifying profile settings", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSafetyAndPrivacySettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const safetyAndPrivacySettings = await User.findOne({ _id: userId })
      .select("blockedUsers mutedCommunities")
      .populate({
        path: "blockedUsers",
        select: "_id username avatar",
      })
      .populate({
        path: "mutedCommunities",
        select: "_id name image",
      });
    res.status(200).json(safetyAndPrivacySettings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.modifySafetyAndPrivacySettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const { blockedUsername, mutedCommunityname } = req.body;
    const user = await User.findOne({ _id: userId });

    if (blockedUsername) {
      const blockedUser = await User.findOne({ username: blockedUsername });
      if (blockedUser) {
        const index = user.blockedUsers.indexOf(blockedUser._id);
        if (index !== -1) {
          user.blockedUsers.splice(index, 1);
        } else {
          user.blockedUsers.push(blockedUser._id);
        }
      } else {
        return res.status(404).json({ error: "Blocked user not found" });
      }
    }

    if (mutedCommunityname) {
      const mutedCommunity = await Community.findOne({
        name: mutedCommunityname,
      });
      if (mutedCommunity) {
        const index = user.mutedCommunities.indexOf(mutedCommunity._id);
        if (index !== -1) {
          user.mutedCommunities.splice(index, 1);
        } else {
          user.mutedCommunities.push(mutedCommunity._id);
        }
      } else {
        return res.status(404).json({ error: "Muted community not found" });
      }
    }

    await user.save();

    res.status(200).json({ message: "Successful update" });
  } catch (err) {
    console.error("Error modifying safety and privacy settings", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNotificationSetting = async (req, res) => {
  try {
    const userId = req.user._id;
    const notificationSetting = await User.findOne({ _id: userId }).select(
      "mentions comments upvotesComments upvotesPosts replies newFollowers invitations posts"
    );
    res.status(200).json(notificationSetting);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};

exports.modifyNotificationSetting = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      mentions,
      comments,
      upvotesComments,
      upvotesPosts,
      replies,
      newFollowers,
      invitations,
      posts,
    } = req.body;

    const notificationSetting = await User.findOne({ _id: userId });

    if (mentions !== undefined) {
      notificationSetting.mentions = mentions;
    }
    if (comments !== undefined) {
      notificationSetting.comments = comments;
    }
    if (upvotesComments !== undefined) {
      notificationSetting.upvotesComments = upvotesComments;
    }
    if (upvotesPosts !== undefined) {
      notificationSetting.upvotesPosts = upvotesPosts;
    }
    if (replies !== undefined) {
      notificationSetting.replies = replies;
    }
    if (newFollowers !== undefined) {
      notificationSetting.newFollowers = newFollowers;
    }
    if (invitations !== undefined) {
      notificationSetting.invitations = invitations;
    }
    if (posts !== undefined) {
      notificationSetting.posts = posts;
    }

    await notificationSetting.save();

    res.status(200).json({ message: "Successful update" });
  } catch (err) {
    console.error("Error modifying notification settings", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
