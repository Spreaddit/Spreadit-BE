const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema(
    {
        communityName: {
            type: String,
            required: true,
        },
        communityRules: {
            type: String,
            required: true,
        },
        communityDiscription: {
            type: String,
            required: true,
        }

        //todo add the community settings attributes
        //todo figure out mawdo3 el moderator how is it gonna be saved array or something else?
        //todo mawdo3 el nas ely fi el community how are we gonna save them as well?
        
        
    }
);