const FeedSetting = require('./../models/user');
const jwt = require("jsonwebtoken");

exports.getFeedSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const feedSetting = await FeedSetting.findOne({ _id: userId }).select('adultContent autoplayMedia communityThemes communityContentSort globalContentView openPostsInNewTab');
        res.status(200).json(feedSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyFeedSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const modifyFeedSetting = req.body;
        const feedSetting = await FeedSetting.findOne({ _id: userId });
        Object.assign(feedSetting, modifyFeedSetting);
        await feedSetting.save();
        res.status(200).json({ message: "Successful update" });

    } catch (err) {
        console.error('Error modifying feed settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
