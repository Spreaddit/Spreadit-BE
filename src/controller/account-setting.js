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

exports.deleteAccount = async (req, res) => {
    try {
        //const userId = req.user;  //return undefined
        const userId = req.body.user; // this will be removed 
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        await AccountSetting.deleteOne({ _id: userId });

        res.status(200).json({ message: 'Account deleted successfully' });

    } catch (err) {
        console.error('Error deleting account:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
