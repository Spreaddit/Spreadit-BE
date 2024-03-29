const ProfileSetting = require('./../models/user');
const jwt = require("jsonwebtoken");

exports.getProfileSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const profileSettings = await ProfileSetting.findOne({ _id: userId }).select('displayName about socialLinks profilePicture banner nsfw allowFollow contentVisibility activeInCommunityVisibility clearHistory');
        res.status(200).json(profileSettings);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyProfileSettings = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;

        const modifyProfileSettings = req.body;
        const profileSetting = await ProfileSetting.findOne({ _id: userId });
        Object.assign(profileSetting, modifyProfileSettings);

        await profileSetting.save();
        res.status(200).json({ message: "Successful update" });

    } catch (err) {
        console.error('Error modifying profile settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
