const Post = require("../models/post");
const Comment = require("../models/comment.js");
const User = require("../models/user");
const Report = require("../models/report.js");
const Community = require("../models/community.js");
const mongoose = require("mongoose");
const Notification = require('../models/notification');


exports.markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ userId: req.user._id }, { $set: { isRead: true } });
        res.status(200).json({ message: 'Notifications marked as read successfully' });
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUnreadNotificationCount = async (req, res) => {
    try {
        const unreadCount = await Notification.countDocuments({ userId: req.user._id, isRead: false });
        const responseObject = {
            unreadCount: unreadCount
        };
        res.status(200).json(responseObject);
    } catch (error) {
        console.error('Error retrieving unread notification count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.markNotificationAsRead = async (req, res) => {
    try {
        const userId = req.user._id;
        const notificationId = req.params.notificationId;
        const notification = await Notification.findOne({ _id: notificationId, userId: userId });
        if (!notification) {
            return res.status(404).send({ message: "Notification not found" });
        }
        const notificationRead = await Notification.findByIdAndUpdate(
            notificationId,
            { isRead: true },
            { new: true, runValidators: true }
        );
        // const notificationObject = await Notification.getNotificationObject(notificationRead);
        res.status(200).send({
            message: "Notification has been marked as read successfully",
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.getAllNotifications = async (req, res) => {
    try {
        const user = req.user;

        // Find notifications for the user that are not hidden
        const result = await Notification.find({ userId: user._id, isHidden: false })
            .sort({ createdAt: -1 })
            .populate('relatedUserId')
            .populate('notificationTypeId')
            .populate('commentId')
            .populate('postId')
            .populate('userId');

        if (!result || result.length === 0) {
            return res.status(404).send({ error_message: "Notifications not found" });
        }
        const notifications = result.map(notification => Notification.getNotificationObject(notification));

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error retrieving notifications:', error);
        res.status(500).send({ error: error.toString() });
    }
};

exports.hideNotification = async (req, res) => {
    try {
        const notificationId = req.params.notificationId;
        const updatedNotification = await Notification.findByIdAndUpdate(
            notificationId,
            { isHidden: true },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).send({ error: 'Notification not found' });
        }

        res.status(200).send({ message: "Notification hidden successfully" });
    } catch (error) {
        console.error('Error hiding notification:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};