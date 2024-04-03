const Message = require('./../models/message');
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

exports.getAccountSettings = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const accountSettings = await User.findOne({ _id: userId }).select('email gender country connectedAccounts');
        res.status(200).json(accountSettings);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.modifyAccountSettings = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;

        const modifyAccountSettings = req.body;
        if (!isValidEmail(modifyAccountSettings.email)) {
            return res.status(403).json({ error: 'Invalid email format' });
        }
        const accountSetting = await User.findOne({ _id: userId });
        Object.assign(accountSetting, modifyAccountSettings);

        await accountSetting.save();
        res.status(200).json({ message: "Successful update" });

    } catch (err) {
        console.error('Error modifying account settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;

        await User.deleteOne({ _id: userId });

        res.status(200).json({ message: 'Account deleted successfully' });

    } catch (err) {
        console.error('Error deleting account:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getChatAndMessagingSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const chatAndMessagingSetting = await User.findOne({ _id: userId }).select('sendYouFriendRequests sendYouPrivateMessages approvedUsers');
        res.status(200).json(chatAndMessagingSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyChatAndMessagingSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;

        const modifyChatAndMessagingSetting = req.body;
        const chatAndMessagingSetting = await User.findOne({ _id: userId });
        Object.assign(chatAndMessagingSetting, modifyChatAndMessagingSetting);
        await chatAndMessagingSetting.save();
        res.status(200).json({ message: "Successful update" });

    } catch (err) {
        console.error('Error modifying chatAndMessaging settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.makeAllAsRead = async (req, res) => {

    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const updatedMessages = await Message.updateMany({ userId }, { isRead: 'true' });

        res.status(200).json(updatedMessages);

    } catch (err) {
        console.error('Error updating message status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }

};

exports.getEmailSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const emailSetting = await User.findOne({ _id: userId }).select('newFollowerEmail chatRequestEmail unsubscribeAllEmails');
        res.status(200).json(emailSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyEmailSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const modifyEmailSetting = req.body;
        const emailSetting = await User.findOne({ _id: userId });
        Object.assign(emailSetting, modifyEmailSetting);

        await emailSetting.save();
        res.status(200).json({ message: "Successful update" });

    } catch (err) {
        console.error('Error modifying email settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getFeedSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const feedSetting = await User.findOne({ _id: userId }).select('adultContent autoplayMedia communityThemes communityContentSort globalContentView openPostsInNewTab');
        res.status(200).json(feedSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyFeedSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const modifyFeedSetting = req.body;
        const feedSetting = await User.findOne({ _id: userId });
        Object.assign(feedSetting, modifyFeedSetting);
        await feedSetting.save();
        res.status(200).json({ message: "Successful update" });

    } catch (err) {
        console.error('Error modifying feed settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.checkPasswordMatch = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const enteredPassword = req.body.enteredPassword;
        const user = await User.findOne({ _id: userId }).select('password');
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
};

exports.getProfileSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const profileSettings = await User.findOne({ _id: userId }).select('displayName about socialLinks profilePicture banner nsfw allowFollow contentVisibility activeInCommunityVisibility clearHistory');
        res.status(200).json(profileSettings);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyProfileSettings = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;

        const modifyProfileSettings = req.body;
        const profileSetting = await User.findOne({ _id: userId });
        Object.assign(profileSetting, modifyProfileSettings);

        await profileSetting.save();
        res.status(200).json({ message: "Successful update" });

    } catch (err) {
        console.error('Error modifying profile settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getSafetyAndPrivacySettings = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const safetyAndPrivacySettings = await User.findOne({ _id: userId }).select('blockedUsers mutedCommunities');
        res.status(200).json(safetyAndPrivacySettings);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.modifySafetyAndPrivacySettings = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;

        const modifySafetyAndPrivacySettings = req.body;
        const SafetyAndPrivacySettings = await User.findOne({ _id: userId });
        Object.assign(SafetyAndPrivacySettings, modifySafetyAndPrivacySettings);

        await SafetyAndPrivacySettings.save();
        const response = SafetyAndPrivacySettings;
        res.status(200).json({ message: "Successful update" });

    } catch (err) {
        console.error('Error modifying safety and privacy settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getNotificationSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;
        const notificationSetting = await User.findOne({ _id: userId }).select('mentions comments upvotesComments upvotesPosts replies newFollowers invitations posts');
        res.status(200).json(notificationSetting);
    } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.modifyNotificationSetting = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const decodeToken = jwt.decode(token);
        const userId = decodeToken._id;

        const modifyNotificationSetting = req.body;
        const notificationSetting = await User.findOne({ _id: userId });
        Object.assign(notificationSetting, modifyNotificationSetting);

        await notificationSetting.save();
        res.status(200).json({ message: "Successful update" });

    } catch (err) {
        console.error('Error modifying notification settings', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
