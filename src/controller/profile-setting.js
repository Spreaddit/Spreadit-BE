const ProfileSetting = require('./../models/user');

exports.getProfileSetting = async (req, res) => {
    try {
        const profileSettings = await ProfileSetting.find().select('displayName about socialLinks profilePicture banner nsfw allowFollow contentVisibility activeInCommunityVisibility clearHistory');
        res.status(200).json(profileSettings);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyProfileSettings = async (req, res) => {
    try {
        //const user = req.user;  //return undifined
        const user = req.body.user; // this will be removed 
        if (!user) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const modifyProfileSettings = req.body;
        const profileAccountSetting = await ProfileSetting.findOne({ _id: user });
        Object.assign(profileAccountSetting, modifyProfileSettings);

        await profileAccountSetting.save();
        const response = profileAccountSetting;
        res.status(200).json(response);

    } catch (err) {
        console.error('Error modifying profile settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
