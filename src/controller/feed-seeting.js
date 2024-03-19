const FeedSetting = require('./../models/user');

exports.getFeedSetting = async (req, res) => {
    try {
        const feedSetting = await FeedSetting.find().select('adultContent autoplayMedia communityThemes communityContentSort globalContentView openPostsInNewTab');
        res.status(200).json(feedSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

