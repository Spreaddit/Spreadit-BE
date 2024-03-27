const BlockingSetting = require('./../models/user');
const jwt = require("jsonwebtoken");

exports.getBlockingSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const blockingSetting = await BlockingSetting.findOne({ _id: userId }).select('blockedAccounts allowFollow');
        res.status(200).json({ success: 'success process' });
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyBlockingSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;

        const modifyBlockingSetting = req.body;
        const blockingSetting = await BlockingSetting.findOne({ _id: userId });
        Object.assign(blockingSetting, modifyBlockingSetting);

        await blockingSetting.save();
        const response = blockingSetting;
        res.status(200).json({ message: "Successful update" });

    } catch (err) {
        console.error('Error modifying blocking Setting', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
