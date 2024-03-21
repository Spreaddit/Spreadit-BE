const ChatAndMessagingSetting = require('./../models/user');

exports.getChatAndMessagingSetting = async (req, res) => {
    try {
        const chatAndMessagingSetting = await ChatAndMessagingSetting.find().select('sendYouFriendRequests sendYouPrivateMessages approvedUsers');
        res.status(200).json(chatAndMessagingSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyChatAndMessagingSetting = async (req, res) => {
    try {
        //const userId = req.user;  //return undefined
        const userId = req.body.user; // this will be removed 
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const modifyChatAndMessagingSetting = req.body;
        const chatAndMessagingSetting = await ChatAndMessagingSetting.findOne({ _id: userId });
        Object.assign(chatAndMessagingSetting, modifyChatAndMessagingSetting);
        await chatAndMessagingSetting.save();
        const response = chatAndMessagingSetting;
        res.status(200).json(response);

    } catch (err) {
        console.error('Error modifying chatAndMessaging settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.makeAllAsRead = async (req, res) => {
    //const userId = req.user;  //return undefined
    const userId = req.body.user; // this will be removed 
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

}