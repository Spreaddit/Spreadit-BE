const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmailSettingSchema = new Schema(
    {
        newFollowers: {
            type: Boolean,
            default: 1,
        },
        chatRequestEmail: {
            type: Boolean,
            default: 1,
        },
        unsubscribeAllEmails: {
            type: Boolean,
            default: 0,
        },
    }
);

const EmailSetting = mongoose.model("EmailSetting", EmailSettingSchema);
module.exports = EmailSetting;