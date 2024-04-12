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
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  communityBanner: {
    type: String,
    format: "url",
    description: "Link to the banner of the community",
  },
  image: {
    type: String,
    format: "url",
    description: "Link to the image of the community",
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
  // Note: I didn't make it required for the community to have at least one moderator as the creator is the first moderator of the community. Moderators are supposed to have less privileges than creator of the community
  moderators: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    index: true,
  },
  membersCount: {
    type: Number,
    default: 1,
  },

  //TODO: add the community settings attributes
  //TODO: Handling moderators and creator
  //TODO: Community members
  //TODO: helper function verfiying that the community
});

const Community = mongoose.model("community", CommunitySchema);

module.exports = Community;
