const ProfileSetting = require('./../models/user');
const jwt = require("jsonwebtoken");

exports.getProfileSetting = async (req, res) => {
    try {
        const token = req.body.token;
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
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        if (!user) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const modifyProfileSettings = req.body;
        const profileSetting = await ProfileSetting.findOne({ _id: user });
        Object.assign(profileSetting, modifyProfileSettings);

        await profileSetting.save();
        res.status(200).json({ message: "success" });

    } catch (err) {
        console.error('Error modifying profile settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
