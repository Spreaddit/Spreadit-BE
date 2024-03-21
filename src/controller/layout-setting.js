const LayoutSetting = require('./../models/user');
const jwt = require("jsonwebtoken");

exports.checkPasswordMatch = async (req, res) => {
    try {
        const token = req.body.token;
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const enteredPassword = req.body.enteredPassword;
        const userPassword = await LayoutSetting.findOne({ _id: userId }).select('password');
        if (enteredPassword === userPassword) {
            res.status(200).json({
                "message": "Password matches"
            });
        }
        else {
            res.status(401).json({
                "error": "Current password is incorrect"
            });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
}