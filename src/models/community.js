const mongoose = require("mongoose");
const { boolean } = require("yargs");
const Schema = mongoose.Schema;
require("./user");

const InsightSchema = new Schema({
  month: {
    type: Date,
    required: true,
    unique: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  newMembers: {
    type: Number,
    default: 0,
  },
  leavingMembers: {
    type: Number,
    default: 0,
  },
});
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
  membersCount: {
    type: Number,
    default: 1,
  },
  membersNickname: {
    type: String,
    default: "Members",
    maxlength: 30,
  },
  contributors: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    index: true,
  },
  insights: {
    type: [InsightSchema],
    default: [],
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

CommunitySchema.statics.getCommunityObjectFiltered = async function (community, userId) {
  const isFollowing = await this.isUserFollowingCommunity(userId, community._id);
  const communityObject = {
    communityId: community._id,
    communityName: community.name,
    communityProfilePic: community.profilePic,
    membersCount: community.members.length,
    communityInfo: community.info,
    isFollowing: isFollowing,
  };
  return communityObject;
};

CommunitySchema.statics.isUserFollowingCommunity = async function (userId, communityId) {
  const user = await this.model("user").findById(userId);
  if (!user) {
    return false;
  }
  return user.subscribedCommunities.includes(communityId);
};
CommunitySchema.statics.getCommunityObject = async function (communityName, userId) {
  const community = await Community.findOne({ name: communityName });
  const communityObject = {
    name: community.name,
    category: community.category,
    rules: community.rules,
    removalReasons: community.removalReasons,
    dateCreated: community.dateCreated,
    communityBanner: community.communityBanner,
    image: community.image,
    description: community.description,
    is18plus: community.is18plus,
    allowNfsw: community.allowNfsw,
    allowSpoile: community.allowSpoile,
    communityType: community.communityType,
    creator: community.creator,
    members: community.members,
    moderators: community.moderators,
    membersCount: community.members.length,
    membersNickname: community.membersNickname,
    contributors: community.contributors,
    settings: community.settings,
    dateCreated: community.createdAt,
    isModerator: community.moderators.includes(userId),
    isCreator: userId.equals(community.creator),
    isMember: community.members.includes(userId),
    isContributor: community.contributors.includes(userId),
  };
  return communityObject;
};

const Community = mongoose.model("community", CommunitySchema);

module.exports = Community;
