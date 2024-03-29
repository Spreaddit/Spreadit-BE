const ContactSetting = require('./../models/user');
const jwt = require("jsonwebtoken");

exports.getContactSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const contactSetting = await ContactSetting.findOne({ _id: userId }).select('inboxMessages chatMessages chatRequests mentions commentsOnYourPost commentsYouFollow upvotes repliesToComments newFollowers cakeDay modNotifications');
        res.status(200).json(contactSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyContactSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;

        const modifyContactSetting = req.body;
        const contactSetting = await ContactSetting.findOne({ _id: userId });
        Object.assign(contactSetting, modifyContactSetting);

        await contactSetting.save();
        res.status(200).json({ message: "Successful update" });

    } catch (err) {
        console.error('Error modifying contact settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
