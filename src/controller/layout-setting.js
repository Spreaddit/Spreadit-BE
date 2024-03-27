const LayoutSetting = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


exports.checkPasswordMatch = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const enteredPassword = req.body.enteredPassword;
        const user = await LayoutSetting.findOne({ _id: userId }).select('password');
        const passwordMatch = await bcrypt.compare(enteredPassword, user.password);
        if (passwordMatch) {
            res.status(200).json({ message: 'Password matches' });
        } else {
            res.status(401).json({ error: 'Current password is incorrect' });
        }
    } catch (err) {
        console.error('Error checking password match:', err);
        res.status(500).json({ error: 'Internal server error' })
    }
}