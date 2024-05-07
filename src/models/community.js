const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.js");
const Moderator = require("./moderator.js");

require("./user");
require("./removalReason.js");
require("./rule");
const InsightSchema = new Schema({
  month: {
    type: Date,
    required: true,
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
    ref: "user",
  },
  members: {
    type: [Schema.Types.ObjectId],
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
  last7DaysInsights: {
    type: [InsightSchema],
    default: [],
  },
  monthlyInsights: {
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
        default: {
          mediaInCommentsAllowed: true,
        },
      },
    },
    default: {
      postTypeOptions: "any",
      spoilerEnabled: true,
      multipleImagesPerPostAllowed: true,
      pollsAllowed: true,
      commentSettings: {
        mediaInCommentsAllowed: true,
      },
    },
  },
});

CommunitySchema.statics.getCommunityObjectFiltered = async function (
  community,
  userId
) {
  const isFollowing = await this.isUserFollowingCommunity(
    userId,
    community._id
  );
  const communityObject = {
    communityId: community._id,
    communityName: community.name,
    communityProfilePic: community.image,
    membersCount: community.members.length,
    communityInfo: community.description,
    isFollowing: isFollowing,
  };
  return communityObject;
};

CommunitySchema.statics.isUserFollowingCommunity = async function (
  userId,
  communityId
) {
  const user = await this.model("user").findById(userId);
  if (!user) {
    return false;
  }
  return user.subscribedCommunities.includes(communityId);
};

CommunitySchema.statics.getCommunityObject = async function (
  communityName,
  userId
) {
  const user = await this.model("user").findById(userId);
  const community = await Community.findOne({ name: communityName })
    .select(
      "name category rules removalReasons dateCreated communityBanner image description is18plus allowNfsw allowSpoile communityType creator members moderators membersCount membersNickname contributors settings"
    )
    .populate("rules", "title description reportReason appliesTo")
    .populate("removalReasons", "title reasonMessage")
    .populate("members", "username banner avatar")
    .populate("moderators", "username banner avatar")
    .populate("creator", "username banner avatar")
    .populate("contributors", "username banner avatar");

  if (!community) {
    return null;
  }

  const isUserModerator = await this.isModerator(userId, communityName);
  const isUserCreator = await this.isCreator(userId, communityName);

  return {
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
    isModerator: isUserModerator,
    isCreator: isUserCreator,
    isMember: community.members.some((member) => member._id.equals(user._id)),
    isContributor: community.contributors.some((contributor) =>
      contributor._id.equals(user._id)
    ),
  };
};
CommunitySchema.statics.isModerator = async function (userId, communityName) {
  const user = await this.model("user").findById(userId);
  if (!user) {
    return false;
  }

  const moderator = await Moderator.findOne({
    username: user.username,
    communityName: communityName,
    isAccepted: true,
  });

  return !!moderator;
};
CommunitySchema.statics.isCreator = async function (userId, communityName) {
  const community = await this.findOne({
    name: communityName,
    creator: userId,
  });
  return !!community;
};
const Community = mongoose.model("community", CommunitySchema);

module.exports = Community;
