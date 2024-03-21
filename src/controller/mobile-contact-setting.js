const ContactSetting = require('./../models/user');

exports.getContactSetting = async (req, res) => {
    try {
        const contactSetting = await ContactSetting.find().select('inboxMessages chatMessages chatRequests mentions commentsOnYourPost commentsYouFollow upvotes repliesToComments newFollowers cakeDay modNotifications');
        res.status(200).json(contactSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyContactSetting = async (req, res) => {
    try {
        //const userId = req.user;  //return undefined
        const userId = req.body.user; // this will be removed 
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const modifyContactSetting = req.body;
        const contactSetting = await ContactSetting.findOne({ _id: userId });
        Object.assign(contactSetting, modifyContactSetting);

        await contactSetting.save();
        const response = contactSetting;
        res.status(200).json(response);

    } catch (err) {
        console.error('Error modifying contact settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
