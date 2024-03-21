const SafetyAndPrivacySetting = require('./../models/user');
const jwt = require("jsonwebtoken");

exports.getSafetyAndPrivacySettings = async (req, res) => {
    try {
        const token = req.body.token;
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const safetyAndPrivacySettings = await SafetyAndPrivacySetting({ _id: userId }).select('blockedUsers mutedCommunities');
        res.status(200).json(safetyAndPrivacySettings);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.modifySafetyAndPrivacySettings = async (req, res) => {
    try {
        const token = req.body.token;
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const modifySafetyAndPrivacySettings = req.body;
        const SafetyAndPrivacySettings = await SafetyAndPrivacySetting.findOne({ _id: userId });
        Object.assign(SafetyAndPrivacySettings, modifySafetyAndPrivacySettings);

        await SafetyAndPrivacySettings.save();
        const response = SafetyAndPrivacySettings;
        res.status(200).json(response);

    } catch (err) {
        console.error('Error modifying safety and privacy settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
