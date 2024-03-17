const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NotificationSettingSchema = new Schema(
    {
        mentions: {
            type: Boolean,
            default: 1,
        },
        comments: {
            type: Boolean,
            default: 1,
        },
        upVotes: {
            type: Boolean,
            default: 1,
        },
        replies: {
            type: Boolean,
            default: 1,
        },
        newFollowers: {
            type: Boolean,
            default: 1,
        },
        invitations: {
            type: Boolean,
            default: 1,
        },
        posts: {
            type: Boolean,
            default: 0,
        },
    }
);

const NotificationSetting = mongoose.model("NotificationSetting", NotificationSettingSchema);
module.exports = NotificationSetting;