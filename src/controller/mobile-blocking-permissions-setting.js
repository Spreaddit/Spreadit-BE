const BlockingSetting = require('./../models/user');

exports.getBlockingSetting = async (req, res) => {
    try {
        const blockingSetting = await BlockingSetting.find().select('blockedAccounts allowFollow');
        res.status(200).json({ success: 'success process' });
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyBlockingSetting = async (req, res) => {
    try {
        //const userId = req.user;  //return undefined
        const userId = req.body.user; // this will be removed 
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const modifyBlockingSetting = req.body;
        const blockingSetting = await BlockingSetting.findOne({ _id: userId });
        Object.assign(blockingSetting, modifyBlockingSetting);

        await blockingSetting.save();
        const response = blockingSetting;
        res.status(200).json(response);

    } catch (err) {
        console.error('Error modifying blocking Setting', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
