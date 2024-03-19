const NotificationSetting = require('./../models/user');

exports.getNotificationSetting = async (req, res) => {
    try {
        const notificationSetting = await NotificationSetting.find().select('mentions commentsOnYourPost commentsYouFollow upvotesComments upvotesPosts replies newFollowers invitations posts');
        res.status(200).json(notificationSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};
