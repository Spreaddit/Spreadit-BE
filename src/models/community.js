const mongoose = require("mongoose");
const { boolean } = require("yargs");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  name: {
    type: String,
    unique: [true, "A community with this name already exists"],
    required: [true, "You must enter a name for the community"],
    trim: true,
    maxlength: 30,
  },
  category: {
    type: String,
    trim: true,
    maxlength: 30,
  },
  rules: {
    type: [Schema.Types.ObjectId],
    ref: "rule",
    index: true,
    maxlength: 15,
  },
  removalReasons: {
    type: [Schema.Types.ObjectId],
    ref: "removalreason",
    index: true,
    maxlength: 50,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  communityBanner: {
    type: String,
    format: "url",
    description: "Link to the banner of the community",
    default:
      "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713046574/uploads/WhatsApp_Image_2024-04-13_at_5.22.35_PM_f0yaln.jpg",
  },
  image: {
    type: String,
    format: "url",
    description: "Link to the image of the community",
    default:
      "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200,
    default: "",
  },
  is18plus: {
    type: Boolean,
    default: false,
  },
  allowNfsw: {
    type: Boolean,
    default: true,
  },
  allowSpoile: {
    type: Boolean,
    default: true,
  },
  communityType: {
    type: String,
    enum: ["Public", "Restricted", "Private"],
    default: "Public",
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: [true, "A community must have a creator."],
    ref: "user",
  },
  members: {
    type: [Schema.Types.ObjectId],
    required: [true, "A community must have at least one member."],
    ref: "user",
    index: true,
  },
  moderators: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    index: true,
  },
  moderatorPermissions: {
    type: [Schema.Types.ObjectId],
    ref: "moderator",
    index: true,
  },
  membersCount: {
    type: Number,
    default: 1,
  },
  membersNickname: {
    type: String,
    default: "Members",
    maxlength: 30,
  },
  moderators: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    index: true,
  },
  contributors: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    index: true,
  },
  settings: {
    type: {
      postTypeOptions: {
        type: String,
        enum: ["any", "links only", "text posts only"],
        default: "any",
      },
      spoilerEnabled: {
        type: Boolean,
        default: true,
      },
      multipleImagesPerPostAllowed: {
        type: Boolean,
        default: true,
      },
      pollsAllowed: {
        type: Boolean,
        default: true,
      },
      commentSettings: {
        type: {
          mediaInCommentsAllowed: {
            type: Boolean,
            default: true,
          },
        },
        default: {},
      },
    },
    default: {},
  },
});

const Community = mongoose.model("community", CommunitySchema);

module.exports = Community;
