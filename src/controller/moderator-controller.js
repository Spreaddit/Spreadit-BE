const express = require("express");
const User = require("../models/user.js");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const router = express.Router();
const Community = require("../models/community.js");
const Rule = require("../models/rule.js");
const RemovalReason = require("../models/removalReason.js");
const Moderator = require("../models/moderator.js");
router.use(passport.initialize());
router.use(cookieParser("spreaditsecret"));
const { uploadMedia } = require("../service/cloudinary.js");

exports.addRule = async (req, res) => {
  try {
    const { title, description, reportReason, communityName, appliesTo } =
      req.body;

    if (!title || !communityName) {
      return res.status(400).json({ message: "Invalid rule data" });
    }
    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (
      title.length > 100 ||
      (description && description.length > 500) ||
      (reportReason && reportReason.length > 100)
    ) {
      return res.status(400).json({ message: "Invalid rule data" });
    }
    let existingRule = await Rule.findOne({
      title: title,
      communityName: communityName,
    });

    if (existingRule) {
      return res.status(403).json({ message: "Title already used" });
    }

    const ruleReportReason = reportReason || title;

    const ruleAppliesTo =
      appliesTo && ["posts", "comments", "both"].includes(appliesTo)
        ? appliesTo
        : "both";

    existingRule = new Rule({
      title: title,
      description: description || "",
      reportReason: ruleReportReason,
      communityName: communityName,
      appliesTo: ruleAppliesTo,
    });

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!community.moderators.includes(user._id)) {
      return res
        .status(402)
        .json({ message: "You are not a moderator of this community" });
    }

    if (community.rules.length >= 15) {
      return res.status(405).json({ message: "Max number of rules reached" });
    }
    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: user.username,
    });
    if (!moderator || !moderator.manageSettings) {
      return res.status(406).json({
        message: "Moderator doesn't have permission to manage settings",
      });
    }
    await existingRule.save();
    community.rules.push(existingRule._id);
    await community.save();
    res.status(200).json({ message: "Rule added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeRule = async (req, res) => {
  try {
    const { communityName, title } = req.body;

    if (!communityName || !title) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.moderators.includes(user._id)) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const rule = await Rule.findOne({ title: title });

    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    const index = community.rules.indexOf(rule._id);
    if (index == -1) {
      return res.status(404).json({ message: "Rule not found" });
    }
    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: user.username,
    });
    if (!moderator || !moderator.manageSettings) {
      return res.status(406).json({
        message: "Moderator doesn't have permission to manage settings",
      });
    }
    community.rules.splice(index, 1);
    await community.save();
    await Rule.findByIdAndDelete(rule._id);
    res.status(200).json({ message: "Rule removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editRule = async (req, res) => {
  try {
    const { communityName, oldTitle, newRule } = req.body;

    if (!communityName || !oldTitle || !newRule) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }
    const { title, description, reportReason, appliesTo } = newRule;
    if (!title || !communityName) {
      return res.status(400).json({ message: "Invalid rule data" });
    }

    if (
      title.length > 100 ||
      (description && description.length > 500) ||
      (reportReason && reportReason.length > 100)
    ) {
      return res.status(400).json({ message: "Invalid rule data" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.moderators.includes(user._id)) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: user.username,
    });
    if (!moderator || !moderator.manageSettings) {
      return res.status(406).json({
        message: "Moderator doesn't have permission to manage settings",
      });
    }

    const rule = await Rule.findOne({
      title: oldTitle,
      communityName: communityName,
    });

    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    rule.title = title;
    rule.description = description || "";
    rule.reportReason = reportReason || title;
    rule.appliesTo =
      appliesTo && ["posts", "comments", "both"].includes(appliesTo)
        ? appliesTo
        : "both";

    await rule.save();
    res.status(200).json({ message: "Rule edited successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRules = async (req, res) => {
  try {
    const communityName = req.params.communityName;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const rules = await Rule.find({ communityName: communityName }).select(
      "title description reportReason appliesTo"
    );

    res.status(200).json(rules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addRemovalReason = async (req, res) => {
  try {
    const { title, reasonMessage, communityName } = req.body;

    if (!title || !communityName || !reasonMessage) {
      return res.status(400).json({ message: "Invalid removal reason data" });
    }

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.moderators.includes(req.user._id)) {
      return res
        .status(402)
        .json({ message: "You are not a moderator of this community" });
    }

    if (community.removalReasons.length >= 50) {
      return res
        .status(405)
        .json({ message: "Max number of removal reasons reached" });
    }

    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: req.user.username,
    });
    if (!moderator || !moderator.manageSettings) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }
    const removalReason = new RemovalReason({
      title,
      reasonMessage,
      communityName,
    });

    await removalReason.save();
    community.removalReasons.push(removalReason._id);
    await community.save();
    res.status(200).json({ message: "Removal reason added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeRemovalReason = async (req, res) => {
  try {
    const { communityName, rId } = req.body;

    if (!communityName || !rId) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.moderators.includes(req.user._id)) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const index = community.removalReasons.findIndex(
      (reason) => reason._id.toString() === rId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Removal reason not found" });
    }

    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: req.user.username,
    });
    if (!moderator || !moderator.manageSettings) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }

    community.removalReasons.splice(index, 1);
    await community.save();
    await RemovalReason.findByIdAndDelete(rId);
    res.status(200).json({ message: "Removal reason removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editRemovalReason = async (req, res) => {
  try {
    const { communityName, rId, newRemovalReason } = req.body;

    if (!communityName || !rId || !newRemovalReason) {
      return res.status(400).json({ message: "Invalid removal reason data" });
    }
    const { title, reasonMessage } = newRemovalReason;
    if (!title || !reasonMessage) {
      return res.status(400).json({ message: "Invalid removal reason data" });
    }
    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.moderators.includes(req.user._id)) {
      return res
        .status(402)
        .json({ message: "You are not a moderator of this community" });
    }

    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: req.user.username,
    });
    if (!moderator || !moderator.manageSettings) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }

    const removalReason = await RemovalReason.findById(rId);

    if (!removalReason) {
      return res.status(404).json({ message: "Removal Reason not found" });
    }

    removalReason.title = title;
    removalReason.reasonMessage = reasonMessage;

    await removalReason.save();

    res.status(200).json({ message: "Removal reason edited successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRemovalReasons = async (req, res) => {
  try {
    const communityName = req.params.communityName;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    const removalReasons = await RemovalReason.find({
      communityName: communityName,
    });

    res.status(200).json(removalReasons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.leaveModeration = async (req, res) => {
  try {
    const { communityName, username } = req.params;

    if (!communityName || !username) {
      return res.status(400).json({ message: "Invalid leave request" });
    }
    if (username != req.user.username) {
      return res.status(400).json({ message: "Invalid leave request" });
    }

    const user = await User.findOne({ username });
    const community = await Community.findOne({ name: communityName });

    if (!user || !community) {
      return res.status(404).json({ message: "User or community not found" });
    }

    if (!community.moderators.includes(user._id)) {
      return res.status(402).json({ message: "User is not a moderator" });
    }

    const userIndex = community.moderators.indexOf(user._id);
    if (userIndex !== -1) {
      community.moderators.splice(userIndex, 1);
      if (user.equals(community.creator)) {
        const oldestModerator = await Moderator.findOne({
          communityName,
          isAccepted: true,
          username: { $ne: user.username },
        }).sort({
          createdAt: 1,
        });
        if (oldestModerator) {
          const oldestModuser = await User.findOne({
            username: oldestModerator.username,
          });
          community.creator = oldestModuser;
        } else {
          community.creator = null;
        }
      }
      await community.save();
    }
    const communityIndex = user.moderatedCommunities.indexOf(community._id);
    if (communityIndex !== -1) {
      user.moderatedCommunities.splice(communityIndex, 1);
      await user.save();
    }

    await Moderator.deleteOne({
      communityName: communityName,
      username: username,
    });

    res.status(200).json({ message: "Left moderator role successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCommunityInfo = async (req, res) => {
  try {
    const communityName = req.params.communityName;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const communityObject = await Community.getCommunityObject(
      communityName,
      req.user._id
    );
    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    const currentDate = new Date();
    const currentMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const lastMonthlyInsight =
      community.monthlyInsights[community.monthlyInsights.length - 1];

    const last7DaysInsight =
      community.last7DaysInsights[community.last7DaysInsights.length - 1];

    if (
      !lastMonthlyInsight ||
      lastMonthlyInsight.month.getMonth() !== currentMonthStart.getMonth()
    ) {
      const newMonthlyInsight = {
        month: new Date(currentMonthStart),
        views: 1,
        newMembers: 0,
        leavingMembers: 0,
      };
      community.monthlyInsights.push(newMonthlyInsight);
    } else {
      lastMonthlyInsight.views += 1;
    }

    if (!last7DaysInsight || !isSameDay(last7DaysInsight.month, currentDate)) {
      const new7DaysInsight = {
        month: new Date(),
        views: 1,
        newMembers: 0,
        leavingMembers: 0,
      };
      community.last7DaysInsights.push(new7DaysInsight);
    } else {
      last7DaysInsight.views += 1;
    }

    if (community.last7DaysInsights.length > 7) {
      community.last7DaysInsights.shift();
    }

    await community.save();
    res.status(200).json(communityObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

function isSameDay(date1, date2) {
  if (!date1 || !date2) {
    return false;
  }
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

exports.getContributors = async (req, res) => {
  try {
    const communityName = req.params.communityName;

    const community = await Community.findOne({ name: communityName }).populate(
      "contributors",
      "username banner avatar"
    );
    const user = req.user;

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.moderators.includes(user._id)) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    res.status(200).json(community.contributors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addContributor = async (req, res) => {
  try {
    const communityName = req.params.communityName;
    const username = req.params.username;
    const user = req.user;

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.moderators.includes(user._id)) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const contributorUser = await User.findOne({ username });

    if (!contributorUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (community.contributors.includes(contributorUser._id)) {
      return res.status(405).json({ message: "User is already a contributor" });
    }
    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: req.user.username,
    });
    if (!moderator || !moderator.manageUsers) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }

    community.contributors.push(contributorUser._id);
    await community.save();

    res.status(200).json({ message: "User added as contributor successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeContributor = async (req, res) => {
  try {
    const communityName = req.params.communityName;
    const username = req.params.username;
    const user = req.user;

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.moderators.includes(user._id)) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const contributorUser = await User.findOne({ username });

    if (!contributorUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!community.contributors.includes(contributorUser._id)) {
      return res.status(405).json({ message: "User is not a contributor" });
    }

    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: req.user.username,
    });
    if (!moderator || !moderator.manageUsers) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }

    const contributorIndex = community.contributors.indexOf(
      contributorUser._id
    );

    community.contributors.splice(contributorIndex, 1);
    await community.save();

    res
      .status(200)
      .json({ message: "User removed as contributor successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.isContributor = async (req, res) => {
  try {
    const communityName = req.params.communityName;
    const username = req.params.username;

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const contributorUser = await User.findOne({ username });

    if (!contributorUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isContributor = community.contributors.includes(contributorUser._id);

    res.status(200).json({ isContributor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editCommunityInfo = async (req, res) => {
  try {
    const communityName = req.params.communityName;
    const {
      name,
      is18plus,
      communityType,
      description,
      fileType,
      membersNickname,
    } = req.body;
    let image = null;
    let communityBanner = null;
    if (req.files && req.files["image"] && req.files["image"][0]) {
      image = req.files["image"][0];
    }
    if (
      req.files &&
      req.files["communityBanner"] &&
      req.files["communityBanner"][0]
    ) {
      communityBanner = req.files["communityBanner"][0];
    }

    if (!communityName) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }
    let imageUrl, communityBannerUrl;

    if (image) {
      const imageResult = await uploadMedia(image, "image");
      imageUrl = imageResult.secure_url;
    }
    if (communityBanner) {
      const communityBannerResult = await uploadMedia(communityBanner, "image");
      communityBannerUrl = communityBannerResult.secure_url;
    }

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    const existingCommunity = await Community.findOne({ name });
    if (existingCommunity && name !== communityName) {
      return res.status(402).json({ message: "Community name is used" });
    }

    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: req.user.username,
    });
    if (!moderator || !moderator.manageSettings) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }
    community.name = name || community.name;
    community.is18plus = is18plus || community.is18plus;
    community.communityType = communityType || community.communityType;
    community.description = description || community.description;
    community.image = imageUrl || community.image;
    community.communityBanner = communityBannerUrl || community.communityBanner;
    community.membersNickname = membersNickname || community.membersNickname;

    await community.save();

    res
      .status(200)
      .json({ message: "Community information updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCommunitySettings = async (req, res) => {
  try {
    const communityName = req.params.communityName;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const user = req.user;
    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: user.username,
    });
    if (!moderator || !moderator.manageSettings) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }

    res.status(200).json(community.settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editCommunitySettings = async (req, res) => {
  try {
    const communityName = req.params.communityName;
    const user = req.user;
    if (!communityName) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }
    let {
      postTypeOptions,
      spoilerEnabled,
      multipleImagesPerPostAllowed,
      pollsAllowed,
      commentSettings: { mediaInCommentsAllowed },
    } = req.body;

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.moderators.includes(user._id)) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: user.username,
    });
    if (!moderator || !moderator.manageSettings) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }
    if (!["any", "links only", "text posts only"].includes(postTypeOptions)) {
      console.warn("Invalid postTypeOptions value. Defaulting to 'any'");
      postTypeOptions = "any";
    }
    community.settings.postTypeOptions = postTypeOptions;
    community.settings.spoilerEnabled = spoilerEnabled;
    community.settings.multipleImagesPerPostAllowed =
      multipleImagesPerPostAllowed;
    community.settings.pollsAllowed = pollsAllowed;
    community.settings.commentSettings.mediaInCommentsAllowed =
      mediaInCommentsAllowed;

    await community.save();

    res
      .status(200)
      .json({ message: "Community settings updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMutedCommunities = async (req, res) => {
  try {
    const mutedCommunities = req.user.mutedCommunities;

    if (!mutedCommunities || mutedCommunities.length === 0) {
      return res.status(200).json([]);
    }

    const mutedCommunitiesData = await Community.find({
      _id: { $in: mutedCommunities },
    }).select("name description image membersCount communityBanner");

    res.status(200).json(mutedCommunitiesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCommunityModerators = async (req, res) => {
  try {
    const communityName = req.params.communityName;
    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    const moderators = await Moderator.getAllModerators(communityName);
    res.status(200).json(moderators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCommunityEditableModerators = async (req, res) => {
  try {
    const communityName = req.params.communityName;
    const user = req.user;

    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const moderators = await Moderator.getAllModerators(communityName);

    moderators.sort((a, b) => a.moderationDate - b.moderationDate);

    const userModerator = moderators.find(
      (moderator) => moderator.username === user.username
    );

    if (userModerator) {
      const index = moderators.indexOf(userModerator);
      if (index !== -1) {
        moderators.splice(index, 1);
        moderators.unshift(userModerator);
      }
    }

    const editableModerators = moderators.filter(
      (moderator) => moderator.moderationDate >= userModerator.moderationDate
    );

    res.status(200).json(editableModerators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCommunityInvitedModerators = async (req, res) => {
  try {
    const communityName = req.params.communityName;

    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: req.user.username,
    });
    if (!moderator || !moderator.manageUsers) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }
    const invitedModerators = await Moderator.getInvitedModerators(
      communityName
    );
    res.status(200).json(invitedModerators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeModeratorInvitaton = async (req, res) => {
  try {
    const { communityName, username } = req.params;

    const user = req.user;

    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const moderator = await Moderator.findOne({
      communityName: communityName,
      username: req.user.username,
    });
    if (!moderator || !moderator.manageUsers) {
      return res
        .status(406)
        .json({ message: "Moderator doesn't have permission" });
    }
    const invitedModerator = await Moderator.findOne({
      communityName: communityName,
      isAccepted: false,
      username: username,
    });
    if (!invitedModerator) {
      return res
        .status(402)
        .json({ message: "No invitation sent for this user" });
    }
    await Moderator.findByIdAndDelete(invitedModerator._id);
    res.status(200).json({ message: "Moderator invite removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.isModerator = async (req, res) => {
  try {
    const { communityName, username } = req.params;

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isModerator = community.moderators.includes(user._id);

    res.status(200).json({ isModerator });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.isInvited = async (req, res) => {
  try {
    const { communityName, username } = req.params;

    const invitedModerator = await Moderator.findOne({
      communityName: communityName,
      isAccepted: false,
      username: username,
    });

    const isInvited = invitedModerator ? true : false;

    res.status(200).json({ isInvited });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getModeratedCommunities = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username })
      .select({ moderatedCommunities: 1 })
      .populate(
        "moderatedCommunities",
        "is18plus name category communityType description image membersCount communityBanner membersNickname dateCreated"
      );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.moderatedCommunities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateModerationPermissions = async (req, res) => {
  try {
    const { communityName, username } = req.params;
    const { managePostsAndComments, manageUsers, manageSettings } = req.body;

    if (
      typeof managePostsAndComments !== "boolean" ||
      typeof manageUsers !== "boolean" ||
      typeof manageSettings !== "boolean"
    ) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const userModerator = await Moderator.findOne({
      communityName,
      username: req.user.username,
    });
    const moderator = await Moderator.findOne({ communityName, username });
    if (!moderator) {
      return res.status(404).json({ message: "Moderator not found" });
    }
    if (!userModerator || userModerator.createdAt > moderator.createdAt) {
      return res
        .status(406)
        .json({ message: "Not authorized to modify permissions" });
    }

    moderator.managePostsAndComments = managePostsAndComments;
    moderator.manageUsers = manageUsers;
    moderator.manageSettings = manageSettings;
    await moderator.save();

    res
      .status(200)
      .json({ message: "Moderator permissions changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeModerator = async (req, res) => {
  try {
    const { communityName, username } = req.params;

    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const user = await User.findOne({ username: username });
    const moderator = await Moderator.findOne({
      communityName,
      username: username,
    });
    if (!moderator) {
      return res.status(404).json({ message: "Moderator not found" });
    }
    const userModerator = await Moderator.findOne({
      communityName,
      username: user.username,
    });
    if (!userModerator) {
      return res.status(402).json({ message: "User is not a moderator" });
    }
    if (community.creator.equals(user._id)) {
      return res.status(403).json({
        message: "Moderator doesn't have permission",
      });
    }
    if (userModerator.createdAt > moderator.createdAt) {
      return res
        .status(403)
        .json({ message: "Moderator doesn't have permission" });
    }

    const index = user.moderatedCommunities.indexOf(community._id);
    if (index !== -1) {
      user.moderatedCommunities.splice(index, 1);
    }
    const communityIndex = community.moderators.indexOf(user._id);
    if (communityIndex !== -1) {
      community.moderators.splice(communityIndex, 1);
    }

    await community.save();
    await user.save();
    await Moderator.findByIdAndDelete(moderator._id);

    res.status(200).json({ message: "Moderator removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCommunityInsights = async (req, res) => {
  try {
    const communityName = req.params.communityName;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    const insights = {
      monthlyInsights: community.monthlyInsights,
      last7DaysInsights: community.last7DaysInsights,
    };

    res.status(200).json(insights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const communityName = req.params.communityName;
    const username = req.params.username;
    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const moderator = await Moderator.findOne({
      communityName,
      username: req.user.username,
    });
    if (!moderator) {
      return res.status(402).json({ message: "Not a moderator" });
    }
    const moderatorPermissions = await Moderator.findOne({
      communityName,
      username,
    });
    if (!moderatorPermissions) {
      return res.status(200).json({
        managePostsAndComments: false,
        manageUsers: false,
        manageSettings: false,
      });
    }
    res.status(200).json({
      managePostsAndComments: moderatorPermissions.managePostsAndComments,
      manageUsers: moderatorPermissions.manageUsers,
      manageSettings: moderatorPermissions.manageSettings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
