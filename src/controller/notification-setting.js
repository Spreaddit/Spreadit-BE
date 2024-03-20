const NotificationSetting = require('./../models/user');

exports.getNotificationSetting = async (req, res) => {
    try {
        const notificationSetting = await NotificationSetting.find().select('mentions commentsOnYourPost commentsYouFollow upvotesComments upvotesPosts replies newFollowers invitations posts');
        res.status(200).json(notificationSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyNotificationSetting = async (req, res) => {
    try {
        //const userId = req.user;  //return undefined
        const userId = req.body.user; // this will be removed 
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const modifyNotificationSetting = req.body;
        const notificationSetting = await NotificationSetting.findOne({ _id: userId });
        Object.assign(notificationSetting, modifyNotificationSetting);

        await notificationSetting.save();
        const response = notificationSetting;
        res.status(200).json(response);

    } catch (err) {
        console.error('Error modifying safety and privacy settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
