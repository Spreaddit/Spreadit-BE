const ChatAndMessagingSetting = require('./../models/user');
const Message = require('./../models/message');
const jwt = require("jsonwebtoken");

exports.getChatAndMessagingSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const chatAndMessagingSetting = await ChatAndMessagingSetting.findOne({ _id: userId }).select('sendYouFriendRequests sendYouPrivateMessages approvedUsers');
        res.status(200).json(chatAndMessagingSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyChatAndMessagingSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;

        const modifyChatAndMessagingSetting = req.body;
        const chatAndMessagingSetting = await ChatAndMessagingSetting.findOne({ _id: userId });
        Object.assign(chatAndMessagingSetting, modifyChatAndMessagingSetting);
        await chatAndMessagingSetting.save();
        res.status(200).json({ message: success });

    } catch (err) {
        console.error('Error modifying chatAndMessaging settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.makeAllAsRead = async (req, res) => {

    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const updatedMessages = await Message.updateMany({ userId }, { isRead: 'true' });

        res.status(200).json(updatedMessages);

    } catch (err) {
        console.error('Error updating message status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }

}