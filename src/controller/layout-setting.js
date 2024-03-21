const LayoutSetting = require('./../models/user');

exports.checkPasswordMatch = async (req, res) => {
    try {
        //const userId = req.user;  //return undefined
        const userId = req.body.user; // this will be removed 
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