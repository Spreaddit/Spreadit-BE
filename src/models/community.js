const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema(
    {
        name: {
            type: String,
            unique: [true, "A community with this name already exists"],
            required: [true, 'You must enter a name for the community'],
            trim: true,
            maxlength: 30
        },
        rules: {
            type: String,
            trim: true,
            maxlength: 200,
            default: ''
        },
        description: {
            type: String,
            trim: true,
            maxlength: 200,
            default: ''
        },
        creator: {
            type: Schema.Types.ObjectId,
            required: [true, "A community must have a creator."],
            ref: "user"
        },
        members: {
            type: [Schema.Types.ObjectId],
            required: [true, "A community must have at least one member."],
            ref: "user", 
            index: true
        }

        //todo add the community settings attributes
        //todo figure out mawdo3 el moderator how is it gonna be saved array or something else?
        //todo mawdo3 el nas ely fi el community how are we gonna save them as well?
        //todo helper function verfiying that the community 

    }
);

CommunitySchema.statics.checkExistence = async function (name) {
    const community = await Community.findOne({ name });
    if (community) {
        return true;
    }
    else {
        return false;
    }
}

const Community = mongoose.model("community", UserSchema);

module.exports = Community;
