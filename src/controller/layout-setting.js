const LayoutSetting = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.verifyPassword = async (enteredPassword, storedPassword) => {
    try {
        // Compare the entered password with the stored hashed password
        const passwordMatch = await bcrypt.compare(enteredPassword, storedPassword);
        return passwordMatch;
    } catch (error) {
        console.error('Error verifying password:', error);
        return false;
    }
};

exports.checkPasswordMatch = async (req, res) => {
    try {
        const token = req.body.token;
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const enteredPassword = req.body.enteredPassword;
        const user = await LayoutSetting.findOne({ _id: userId }).select('password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
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