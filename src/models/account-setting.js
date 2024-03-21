const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AccountSettingSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "You must enter an email"],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "You must enter a password"],
            minLength: 8,
            trim: true,
        },
        gender: {
            type: String,
            enum: ['Man', 'Woman', 'I Prefer Not To Say'],
        },
        Country: {
            type: String,
            trim: true,
            maxLength: 30,
            default: "",
        },
    }

);

const AccountSetting = mongoose.model("AccountSetting", AccountSettingSchema);

module.exports = AccountSetting;