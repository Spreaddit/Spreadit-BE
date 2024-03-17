const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SafetyAndPrivacySettingSchema = new Schema(
    {
        blockedUsers: [{
            type: String,
        }],
        mutedCommunities: [{
            type: String,
        }],
    }
);

const SafetyAndPrivacySetting = mongoose.model("SafetyAndPrivacySetting", SafetyAndPrivacySettingSchema);

module.exports = SafetyAndPrivacySetting;