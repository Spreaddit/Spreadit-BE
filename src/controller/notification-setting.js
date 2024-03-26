const NotificationSetting = require('./../models/user');
const jwt = require("jsonwebtoken");

exports.getNotificationSetting = async (req, res) => {
    try {
        const token = req.body.token;
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const notificationSetting = await NotificationSetting.findOne({ _id: userId }).select('mentions comments upvotesComments upvotesPosts replies newFollowers invitations posts');
        res.status(200).json(notificationSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyNotificationSetting = async (req, res) => {
    try {
        const token = req.body.token;
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const modifyNotificationSetting = req.body;
        const notificationSetting = await NotificationSetting.findOne({ _id: userId });
        Object.assign(notificationSetting, modifyNotificationSetting);

        await notificationSetting.save();
        res.status(200).json({ message: "success" });

    } catch (err) {
        console.error('Error modifying notification settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
