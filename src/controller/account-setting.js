const AccountSetting = require('./../models/users');


exports.getAccountSettings = async (req, res) => {
    try {
        const accountSettings = await AccountSetting.find().select('email gender country connectedAccounts');
        res.status(200).json(accountSettings);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.modifyAccountSettings = async (req, res) => {
    //const user = req.user;
    try {
        const modifiedAccountSetting = req.body;
        const { email } = modifiedAccountSetting;
        console.log('Searching for account setting with email:', email);
        const emailAccountSetting = await AccountSetting.find({ email }).limit(1);
        if (emailAccountSetting.length === 0) {
            console.error('Account setting not found for email:', email);
            return res.status(404).json({ error: 'Account setting not found' });
        }
        if (modifiedAccountSetting.password) {
            emailAccountSetting.password = modifiedAccountSetting.password;
        }
        if (modifiedAccountSetting.gender) {
            emailAccountSetting.gender = modifiedAccountSetting.gender;
        }
        if (modifiedAccountSetting.country) {
            emailAccountSetting.country = modifiedAccountSetting.country;
        }

        await emailAccountSetting.save();
        res.status(200).json(existingAccountSetting);

    } catch (err) {
        console.error('Error modifying account settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
