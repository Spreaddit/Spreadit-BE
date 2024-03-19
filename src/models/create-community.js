const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CreateCommunitySchema = new Schema(
    {
        name: {
            type: String,
            unique: [true, "A community with this name already exists"],
            required: [true, 'You must enter a name for the community'],
            trim: true,
            maxlength: 30,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 200,
            default: '',
        },
        rules: {
            type: String,
            trim: true,
            maxlength: 200,
            default: '',
        }
    }
);

const CreateCommunity = mongoose.model("CreateCommunity", CreateCommunitySchema);
module.exports = CreateCommunity;