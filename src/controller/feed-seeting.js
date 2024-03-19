const FeedSetting = require('./../models/user');

exports.getFeedSetting = async (req, res) => {
    try {
        const feedSetting = await FeedSetting.find().select('adultContent autoplayMedia communityThemes communityContentSort globalContentView openPostsInNewTab');
        res.status(200).json(feedSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyFeedSetting = async (req, res) => {
    try {
        //const userId = req.user;  //return undefined
        const userId = req.body.user; // this will be removed 
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const modifyFeedSetting = req.body;
        const feedSetting = await FeedSetting.findOne({ _id: userId });
        Object.assign(feedSetting, modifyFeedSetting);
        await feedSetting.save();
        const response = feedSetting;
        res.status(200).json(response);

    } catch (err) {
        console.error('Error modifying feed settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
