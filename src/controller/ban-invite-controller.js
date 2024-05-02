const Community = require("../models/community");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Report = require("../models/report.js");
const Message = require("../models/message");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Conversation = require("../models/conversation");
const { message } = require("../../seed-data/constants/notificationType");
const BanUser = require("../models/banUser");
const Moderator = require("../models/moderator");
const Notification = require("../models/notification");
const NotificationType = require("../../seed-data/constants/notificationType");

exports.banUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "banMessage",
    "banDuration",
    "reason",
    "isPermanent",
    "modNote",
    "accessToken",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  console.log(isValidOperation);
  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates!" });
  }

  try {
    const userId = req.user._id;
    const { communityName, username } = req.params;
    if (!communityName || !username)
      return res
        .status(400)
        .send({ message: "username and community name is required" });
    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName: communityName,
      // isAccepted: true,
    });
    if (!moderator) {
      return res.status(404).send({ message: "Moderator not found" });
    }

    if (!moderator.manageUsers) {
      return res
        .status(403)
        .send({ message: "You are not allowed to manage users" });
    }

    const userToBeBanned = await User.getUserByEmailOrUsername(username);
    if (!userToBeBanned) {
      return res.status(404).send({ message: "User not found" });
    }

    const community = await Community.findOne({
      name: communityName,
      members: userToBeBanned._id,
    });
    if (!community) {
      return res
        .status(404)
        .send({ message: "User is not a member of the community" });
    }

    const banData = {
      userId: userToBeBanned._id,
      banDuration: req.body.banDuration,
      reason: req.body.reason,
      isPermanent: req.body.isPermanent,
      communityName: communityName,
      banMessage: req.body.banMessage,
      modNote: req.body.modNote,
    };
    const ban = new BanUser(banData);
    await ban.save();

    const message = req.body.isPermanent
      ? `You have been banned permanently from posting in ${req.body.communityName}. \n Reason: ${req.body.reason}`
      : `You have been banned from posting in ${
          req.body.communityName
        } until ${new Date(req.body.banDuration).toDateString()}.\n Reason: ${
          req.body.reason
        }`;
    await Notification.sendNotification(
      userToBeBanned._id,
      "You have received a new notification",
      message
    );
    const notification = new Notification({
      userId: userToBeBanned._id,
      content: message,
      notificationTypeId: NotificationType.accountUpdate._id,
    });
    await notification.save();

    const userObj = await User.generateUserObject(userToBeBanned);
    res.status(200).send({
      user: userObj,
      message: "User banned successfully",
    });
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.unbanUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "username",
      "isBanned",
      "accessToken",
      "communityName",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ message: "Invalid updates!" });
    }

    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName: req.body.communityName,
    });
    if (!moderator) {
      return res.status(404).send({ message: "Moderator not found" });
    }

    if (!moderator.manageUsers) {
      return res
        .status(403)
        .send({ message: "You are not allowed to manage users" });
    }

    const userToBeUnbanned = await User.getUserByEmailOrUsername(
      req.body.username
    );
    if (!userToBeUnbanned) {
      return res.status(404).send({ message: "User not found" });
    }

    const community = await Community.findOne({
      name: req.body.communityName,
      members: userToBeUnbanned._id,
    });
    if (!community) {
      return res
        .status(404)
        .send({ message: "User is not a member of the community" });
    }

    // Delete ban record
    const banuser = await BanUser.deleteOne({ userId: userToBeUnbanned._id });
    if (!banuser) {
      return res.status(404).send({ message: "User is not banned" });
    }

    // Send response
    const userObj = await User.generateUserObject(userToBeUnbanned);
    res.status(200).send({
      user: userObj,
      message: "User was unbanned successfully",
    });
  } catch (error) {
    console.error("Error unbanning user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.checkUserBanStatus = async (req, res) => {
  try {
    const { userId, communityName } = req.body;
    if (!userId || !communityName) {
      return res
        .status(400)
        .json({ message: "User ID and community name are required" });
    }
    const banRecord = await BanUser.findOne({
      userId,
      communityName,
    });

    if (banRecord) {
      return res.status(200).json({ banned: true });
    }

    return res.status(200).json({ banned: false });
  } catch (error) {
    console.error("Error checking user ban status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBannedUsersInCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName: req.body.communityName,
    });

    if (!moderator) {
      return res
        .status(403)
        .send({ message: "You are not a moderator of this community" });
    }

    const bannedUsers = await BanUser.find({
      communityName: req.body.communityName,
    });

    if (!bannedUsers || bannedUsers.length === 0) {
      return res
        .status(404)
        .send({ message: "No users are banned in this community" });
    }

    const bannedUsersDetails = await Promise.all(
      bannedUsers.map(async (bannedUser) => {
        const user = await User.findById(bannedUser.userId);
        return {
          userId: user._id,
          username: user.username,
          email: user.email,
          reason: bannedUser.reason,
          banDuration: bannedUser.banDuration,
          isPermanent: bannedUser.isPermanent,
        };
      })
    );

    res.status(200).send(bannedUsersDetails);
  } catch (error) {
    console.error("Error retrieving banned users:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.inviteModerator = async (req, res) => {
  try {
    const userId = req.user._id;
    const communityName = req.params.communityName;
    const username = req.params.username;
    const manageUsers = req.body.manageUsers;
    const managePostsAndComments = req.body.managePostsAndComments;
    const manageSettings = req.body.manageSettings;
    const community = await Community.findOne({ name: communityName });
    const invitedUser = await User.findOne({ username: username });

    if (!community || !invitedUser)
      return res.status(404).send({ message: "User or community not found" });

    if (!manageSettings && !managePostsAndComments && !manageUsers)
      return res.status(400).send({ message: "Invalid moderator invite data" });

    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName,
      isAccepted: true,
      manageUsers: true,
    });

    if (!moderator) {
      return res
        .status(406)
        .send({ message: "Moderator doesn't have permission to manage users" });
    }
    const existingModerator = await Moderator.findOne({
      username,
      communityName,
      isAccepted: true,
    });
    if (existingModerator) {
      return res.status(400).send({ message: "User is already a moderator" });
    }
    const newModerator = new Moderator({
      username: username,
      communityName: communityName,
      managePostsAndComments: managePostsAndComments || false,
      manageUsers: manageUsers || false,
      manageSettings: manageSettings || false,
      isAccepted: false,
    });
    await newModerator.save();

    const newConversation = new Conversation({
      subject: `invitation to moderate ${communityName}`,
    });
    await newConversation.save();
    const newMessage = new Message({
      conversationId: newConversation._id,
      senderId: community._id, // Provide the ID of the sender
      senderType: "community",
      conversationSubject: newConversation.subject,
      recieverId: invitedUser._id, // Provide the ID of the receiver
      contentType: "text",
      content: `you are invited to become a moderator of ${communityName}: 
            to accept, visit the moderators page for ${communityName} and click "accept".
            otherwise, if you did not expect to receive this, you can simply ignore this invitation or report it.`,
    });

    await newMessage.save();
    await Conversation.findByIdAndUpdate(newConversation._id, {
      $addToSet: { messages: newMessage._id },
    });

    res.status(200).send({ message: "Moderator invite sent successfully" });
  } catch (error) {
    console.error("Error inviting moderator:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.acceptInvite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { communityName } = req.params;

    if (!communityName) {
      return res.status(404).json({ message: "Community name is required" });
    }
    const community = await Community.findOne({ name: communityName });
    if (!community)
      return res.status(404).json({ message: " community not found" });

    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName,
      isAccepted: false,
    });

    if (!moderator) {
      return res.status(402).json({ message: "Moderator invite not found" });
    }
    moderator.isAccepted = true;
    await moderator.save();
    community.moderators.push(userId);

    return res
      .status(200)
      .json({ message: "Moderator invite accepted successfully" });
  } catch (error) {
    console.error("Error accepting moderator invite:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.declineInvite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { communityName } = req.params;

    if (!communityName) {
      return res.status(404).json({ message: "Community name is required" });
    }

    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName,
      isAccepted: false,
    });

    if (!moderator) {
      return res.status(402).json({ message: "Moderator invite not found" });
    }
    await Moderator.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ message: "Moderator invite declined successfully" });
  } catch (error) {
    console.error("Error accepting moderator invite:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
