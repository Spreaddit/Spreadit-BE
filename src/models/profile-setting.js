const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProfileSettingSchema = new Schema(
    {
        displayName: {
            type: String,
            trim: true,
            maxLength: 20,
        },
        about: {
            type: String,
            trim: true,
            maxLength: 200,
        },
        avatar: {
            type: String,
            trim: true,
            default: "",
        },
        banner: {
            type: String,
            trim: true,
            default: "",
        },
        nsfw: {
            type: Boolean,
            default: false,
        },
        activeInCommunityVisibility: {
            type: Boolean,
            default: true,
        },
        contentVisibility: {
            type: Boolean,
            default: true,
        },
        allowFollow: {
            type: Boolean,
            default: true,
        }
    }
);

const ProfileSetting = mongoose.model("ProfileSetting", ProfileSettingSchema);
module.exports = ProfileSetting;