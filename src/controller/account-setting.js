const AccountSetting = require('./../modules/account-setting');

exports.getAccountSettings = async (req, res) => {
    try {
        const accountSettings = await AccountSetting.find();
        res.status(200).json(accountSettings);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

