const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedSettingSchema = new Schema(
    {
        communityContentSort: {
            type: String,
            enum: ['Hot', 'New', 'Top', 'Rising'],
            default: 'Hot',
        },
        globalContentView: {
            type: String,
            enum: ['Card', 'Classic', 'Compact'],
            default: 'Card',
        },
        communityThemes: {
            type: Boolean,
            default: 1,
        },
        autoplayMedia: {
            type: Boolean,
            default: 1,
        },
        adultContent: {
            type: Boolean,
            default: 0,
        },
        openPostsInNewTab: {
            type: Boolean,
            default: 0,
        },
    }
);

const FeedSetting = mongoose.model("FeedSetting", feedSettingSchema);
module.exports = FeedSetting;