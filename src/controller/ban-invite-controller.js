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
  try {
    const userId = req.user._id;
    const banDuration = req.body.banDuration;
    const banMessage = req.body.banMessage;
    const reason = req.body.reason;
    const isPermanent = req.body.isPermanent;

    if (!banDuration || !banMessage || !reason)
      return res.status(400).send({ message: "please insert all data" });

    const { communityName, username } = req.params;
    if (!communityName || !username)
      return res
        .status(400)
        .send({ message: "username and community name is required" });
    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName: communityName,
      isAccepted: true,
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
    const banUser = await BanUser.findOne({
      userId: userToBeBanned._id,
      communityName: communityName,
    });
    if (banUser)
      return res.status(400).send({ message: "User is already banned" });

    const banData = {
      userId: userToBeBanned._id,
      banDuration: req.body.banDuration,
      reason: req.body.reason,
      isPermanent: req.body.isPermanent,
      communityName: communityName,
      banMessage: req.body.banMessage,
      modNote: req.body.modNote,
      userWhoBan: req.user.username,
    };
    const ban = new BanUser(banData);
    await ban.save();

    const message = req.body.isPermanent
      ? `You have been banned permanently from posting in ${communityName}. \n Reason: ${req.body.reason}`
      : `You have been banned from posting in ${communityName} until ${new Date(
          req.body.banDuration
        ).toDateString()}.\n Reason: ${req.body.reason}`;
    await Notification.sendNotification(
      userToBeBanned._id,
      "You have received a new notification",
      message
    );

    const newConversation = new Conversation({
      subject: `ban from ${communityName}`,
    });
    await newConversation.save();

    const newMessage = new Message({
      conversationId: newConversation._id,
      senderId: community._id,
      senderType: "community",
      conversationSubject: newConversation.subject,
      recieverId: userToBeBanned._id,
      contentType: "text",
      content: banMessage,
    });
    await newMessage.save();
    await Conversation.findByIdAndUpdate(newConversation._id, {
      $addToSet: { messages: newMessage._id },
    });

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

exports.editBan = async (req, res) => {
  try {
    const userId = req.user._id;
    const banDuration = req.body.banDuration;
    const banMessage = req.body.banMessage;
    const reason = req.body.reason;
    const isPermanent = req.body.isPermanent;

    if (!banDuration || !banMessage || !reason)
      return res.status(400).send({ message: "please insert all data" });

    const { communityName, username } = req.params;
    if (!communityName || !username)
      return res
        .status(400)
        .send({ message: "username and community name is required" });
    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName: communityName,
      isAccepted: true,
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
    const update = {
      banDuration: req.body.banDuration,
      reason: req.body.reason,
      isPermanent: req.body.isPermanent,
      banMessage: req.body.banMessage,
    };

    const updatedBan = await BanUser.findOneAndUpdate(
      {
        userId: userToBeBanned._id,
        communityName: communityName,
      },
      update,
      { new: true }
    );

    if (!updatedBan) {
      return res.status(404).send({ message: "Ban record not found" });
    }

    const message = req.body.isPermanent
      ? `You have been banned permanently from posting in ${communityName}. \n Reason: ${req.body.reason}`
      : `You have been banned from posting in ${communityName} until ${new Date(
          req.body.banDuration
        ).toDateString()}.\n Reason: ${req.body.reason}`;
    await Notification.sendNotification(
      userToBeBanned._id,
      "You have received a new notification",
      message
    );

    const newConversation = new Conversation({
      subject: `Your ban from ${communityName} has changed`,
    });
    await newConversation.save();

    const newMessage = new Message({
      conversationId: newConversation._id,
      senderId: community._id,
      senderType: "community",
      conversationSubject: newConversation.subject,
      recieverId: userToBeBanned._id,
      contentType: "text",
      content: banMessage,
    });
    await newMessage.save();
    await Conversation.findByIdAndUpdate(newConversation._id, {
      $addToSet: { messages: newMessage._id },
    });

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
    const { communityName, username } = req.params;
    if (!communityName || !username)
      return res
        .status(400)
        .send({ message: "username and community name is required" });

    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName: communityName,
    });
    if (!moderator) {
      return res.status(404).send({ message: "Moderator not found" });
    }

    if (!moderator.manageUsers) {
      return res
        .status(403)
        .send({ message: "You are not allowed to manage users" });
    }

    const userToBeUnbanned = await User.getUserByEmailOrUsername(username);
    if (!userToBeUnbanned) {
      return res.status(404).send({ message: "User not found" });
    }

    const community = await Community.findOne({
      name: communityName,
      members: userToBeUnbanned._id,
    });
    if (!community) {
      return res
        .status(404)
        .send({ message: "User is not a member of the community" });
    }
    const banUser = await BanUser.find({ userId: userToBeUnbanned._id });
    if (!banUser)
      return res.status(400).send({ message: "User is not banned" });

    const banuser = await BanUser.deleteOne({
      userId: userToBeUnbanned._id,
      communityName: communityName,
    });
    if (!banuser) {
      return res.status(404).send({ message: "User is not banned" });
    }

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
    const { communityName, username } = req.params;
    if (!communityName || !username)
      return res
        .status(400)
        .send({ message: "username and community name is required" });
    const user = await User.findOne({ username: username });
    const banRecord = await BanUser.findOne({
      userId: user._id,
      communityName,
    });

    if (banRecord) {
      return res.status(200).json({ isBanned: true });
    }

    return res.status(200).json({ isBanned: false });
  } catch (error) {
    console.error("Error checking user ban status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getBannedUsersInCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { communityName } = req.params;
    const moderator = await Moderator.findOne({
      username: req.user.username,
      communityName: communityName,
    });

    if (!moderator) {
      return res
        .status(403)
        .send({ message: "You are not a moderator of this community" });
    }

    const bannedUsers = await BanUser.find({
      communityName: communityName,
    });

    if (!bannedUsers || bannedUsers.length === 0) {
      return res
        .status(404)
        .send({ message: "No users are banned in this community" });
    }

    const bannedUsersDetails = await Promise.all(
      bannedUsers.map(async (bannedUser) => {
        const user = await User.findById(bannedUser.userId);
        const banPeriod = bannedUser.isPermanent
          ? "Permanent"
          : bannedUser.banDuration;
        return {
          username: user.username,
          userProfilePic: user.avatar,
          reasonForBan: bannedUser.reason,
          userWhoBan: bannedUser.userWhoBan,
          banPeriod: banPeriod,
          isPermanent: bannedUser.isPermanent,
          modNote: bannedUser.modNote || "",
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
      senderId: community._id,
      senderType: "community",
      conversationSubject: newConversation.subject,
      recieverId: invitedUser._id,
      contentType: "text",
      content: `you are invited to become a moderator of ${communityName}: 
            to accept, visit the moderators page for ${communityName} and click "accept".
            otherwise, if you did not expect to receive this, you can simply ignore this invitation or report it.`,
    });
    if (invitedUser.invitations) {
      await Notification.sendNotification(
        invitedUser._id,
        "You have recieved a new notification",
        `${req.user.username} invite you to be a moderator in ${communityName} community`
      );
      const notification = new Notification({
        userId: invitedUser._id,
        content: `${req.user.username} invite you to be a moderator in ${communityName} community`,
        relatedUserId: req.user._id,
        notificationTypeId: NotificationType.invite._id,
      });
      await notification.save();
    }
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
    const user = req.user;
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
    if (!community.moderators.includes(userId)) {
      community.moderators.push(userId);
    }
    if (!community.members.includes(userId)) {
      community.members.push(userId);
    }
    await community.save();
    if (!user.moderatedCommunities.includes(community._id))
      user.moderatedCommunities.push(community._id);

    if (!user.subscribedCommunities.includes(community._id))
      user.subscribedCommunities.push(community._id);

    await user.save();

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

    const moderator = await Moderator.findOneAndDelete({
      username: req.user.username,
      communityName,
      isAccepted: false,
    });
    if (!moderator) {
      return res.status(402).json({ message: "Moderator invite not found" });
    }

    return res
      .status(200)
      .json({ message: "Moderator invite declined successfully" });
  } catch (error) {
    console.error("Error accepting moderator invite:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
