const EmailSetting = require('./../models/user');

exports.getEmailSetting = async (req, res) => {
    try {
        const emailSetting = await EmailSetting.find().select('newFollowerEmail chatRequestEmail unsubscribeAllEmails');
        res.status(200).json(emailSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyEmailSetting = async (req, res) => {
    try {
        //const userId = req.user;  //return undefined
        const userId = req.body.user; // this will be removed 
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const modifyEmailSetting = req.body;
        const emailSetting = await EmailSetting.findOne({ _id: userId });
        Object.assign(emailSetting, modifyEmailSetting);

        await emailSetting.save();
        const response = emailSetting;
        res.status(200).json(response);

    } catch (err) {
        console.error('Error modifying email settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
