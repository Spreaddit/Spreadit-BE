const AccountSetting = require('./../models/user');
const jwt = require("jsonwebtoken");


exports.getAccountSettings = async (req, res) => {
    try {
        const token = req.body.token;
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const accountSettings = await AccountSetting.findOne({ _id: userId }).select('email gender country connectedAccounts');
        res.status(200).json(accountSettings);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.modifyAccountSettings = async (req, res) => {
    try {
        //const user = req.user;  //return undifined
        //const user = req.body.user; // this will be removed 
        const token = req.body.token;
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const modifyAccountSettings = req.body;
        const accountSetting = await AccountSetting.findOne({ _id: userId });
        Object.assign(accountSetting, modifyAccountSettings);

        await accountSetting.save();
        res.status(200).json({ message: "success" });

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
