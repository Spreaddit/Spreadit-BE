const EmailSetting = require('./../models/user');
const jwt = require("jsonwebtoken");

exports.getEmailSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const emailSetting = await EmailSetting.findOne({ _id: userId }).select('newFollowerEmail chatRequestEmail unsubscribeAllEmails');
        res.status(200).json(emailSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyEmailSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const modifyEmailSetting = req.body;
        const emailSetting = await EmailSetting.findOne({ _id: userId });
        Object.assign(emailSetting, modifyEmailSetting);

        await emailSetting.save();
        res.status(200).json({ message: "success" });

    } catch (err) {
        console.error('Error modifying email settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
