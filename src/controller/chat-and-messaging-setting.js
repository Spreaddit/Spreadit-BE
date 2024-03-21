const ChatAndMessagingSetting = require('./../models/user');

exports.getChatAndMessagingSetting = async (req, res) => {
    try {
        const chatAndMessagingSetting = await ChatAndMessagingSetting.find().select('sendYouFriendRequests sendYouPrivateMessages markAllChatsAsRead approvedUsers');
        res.status(200).json(chatAndMessagingSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};