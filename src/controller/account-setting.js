const AccountSetting = require('./../models/user');


exports.getAccountSettings = async (req, res) => {
    try {
        const accountSettings = await AccountSetting.find().select('email gender country connectedAccounts');
        res.status(200).json(accountSettings);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.modifyAccountSettings = async (req, res) => {
    //const user = req.user;
    try {
        const modifiedAccountSetting = req.body;
        const { email } = modifiedAccountSetting;
        console.log('Searching for account setting with email:', email);
        const emailAccountSetting = await AccountSetting.findOne({ email });
        if (!emailAccountSetting) {
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
        const response = {
            gender: emailAccountSetting.gender,
            country: emailAccountSetting.country
        };
        res.status(200).json(response);

    } catch (err) {
        console.error('Error modifying account settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
