const express = require("express");
const User = require("../models/user.js");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const router = express.Router();
const Community = require("../models/community.js");
const Moderator = require("../models/moderator.js");
router.use(passport.initialize());
router.use(cookieParser("spreaditsecret"));

exports.addToFavourites = async (req, res) => {
  try {
    const { communityName } = req.body;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (user.favouriteCommunities.includes(community._id)) {
      return res
        .status(402)
        .json({ message: "Community is already in favorites" });
    }

    user.favouriteCommunities.push(community._id);
    await user.save();

    res
      .status(200)
      .json({ message: "Community added to favorites successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeFavourite = async (req, res) => {
  try {
    const { communityName } = req.body;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const index = user.favouriteCommunities.indexOf(community._id);
    if (index == -1) {
      return res.status(402).json({ message: "Community is not in favorites" });
    }

    user.favouriteCommunities.splice(index, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Community removed from favorites successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.isFavourite = async (req, res) => {
  try {
    const { communityName } = req.query;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const isFavourite = user.favouriteCommunities.includes(community._id);
    res.status(200).json({ isFavourite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.muteCommunity = async (req, res) => {
  try {
    const { communityName } = req.body;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (user.mutedCommunities.includes(community._id)) {
      return res.status(402).json({ message: "Community is already muted" });
    }

    user.mutedCommunities.push(community._id);
    await user.save();

    res.status(200).json({ message: "Community muted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.unmuteCommunity = async (req, res) => {
  try {
    const { communityName } = req.body;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const index = user.mutedCommunities.indexOf(community._id);
    if (index == -1) {
      return res.status(402).json({ message: "Community is not muted" });
    }

    user.mutedCommunities.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Community unmuted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.isCommunityMute = async (req, res) => {
  try {
    const { communityName } = req.query;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const isMuted = user.mutedCommunities.includes(community._id);
    res.status(200).json({ isMuted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.mutedCommunities = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate(
      "mutedCommunities",
      "name description image communityBanner membersCount"
    );
    res.status(200).json(user.mutedCommunities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

function isSameDay(date1, date2) {
  if (!date1 || !date2) {
    return false;
  }
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

exports.subscribeToCommunity = async (req, res) => {
  try {
    const { communityName } = req.body;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (
      community.communityType == "Private" ||
      community.communityType == "Restriced"
    ) {
      return res
        .status(403)
        .json({ message: "Restricted or Private community" });
    }

    if (user.subscribedCommunities.includes(community._id)) {
      return res.status(400).json({ message: "User is already subscribed" });
    }

    const currentDate = new Date();
    const currentMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const lastMonthlyInsight =
      community.monthlyInsights[community.monthlyInsights.length - 1];

    const last7DaysInsight =
      community.last7DaysInsights[community.last7DaysInsights.length - 1];

    if (
      !lastMonthlyInsight ||
      lastMonthlyInsight.month.getMonth() !== currentMonthStart.getMonth()
    ) {
      const newMonthlyInsight = {
        month: new Date(currentMonthStart),
        views: 0,
        newMembers: 1,
        leavingMembers: 0,
      };
      community.monthlyInsights.push(newMonthlyInsight);
    } else {
      lastMonthlyInsight.newMembers += 1;
    }

    if (!last7DaysInsight || !isSameDay(last7DaysInsight.month, currentDate)) {
      const new7DaysInsight = {
        month: new Date(),
        views: 0,
        newMembers: 1,
        leavingMembers: 0,
      };
      community.last7DaysInsights.push(new7DaysInsight);
    } else {
      last7DaysInsight.newMembers += 1;
    }

    if (community.last7DaysInsights.length > 7) {
      community.last7DaysInsights.shift();
    }

    user.subscribedCommunities.push(community._id);
    await user.save();
    community.membersCount += 1;
    community.members.push(user._id);
    await community.save();
    res
      .status(200)
      .json({ message: "Subscribed to the community successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.unsubscribeFromCommunity = async (req, res) => {
  try {
    const { communityName } = req.body;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!user.subscribedCommunities.includes(community._id)) {
      return res
        .status(403)
        .json({ message: "User isn't subscribed to community" });
    }

    const currentDate = new Date();
    const currentMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const lastMonthlyInsight =
      community.monthlyInsights[community.monthlyInsights.length - 1];

    const last7DaysInsight =
      community.last7DaysInsights[community.last7DaysInsights.length - 1];

    if (
      !lastMonthlyInsight ||
      lastMonthlyInsight.month.getMonth() !== currentMonthStart.getMonth()
    ) {
      const newMonthlyInsight = {
        month: new Date(currentMonthStart),
        views: 0,
        newMembers: 0,
        leavingMembers: 1,
      };
      community.monthlyInsights.push(newMonthlyInsight);
    } else {
      lastMonthlyInsight.leavingMembers += 1;
    }

    if (!last7DaysInsight || !isSameDay(last7DaysInsight.month, currentDate)) {
      const new7DaysInsight = {
        month: new Date(),
        views: 0,
        newMembers: 0,
        leavingMembers: 1,
      };
      community.last7DaysInsights.push(new7DaysInsight);
    } else {
      last7DaysInsight.leavingMembers += 1;
    }

    if (community.last7DaysInsights.length > 7) {
      community.last7DaysInsights.shift();
    }
    const index = user.subscribedCommunities.indexOf(community._id);
    user.subscribedCommunities.splice(index, 1);
    await user.save();
    community.membersCount -= 1;
    community.members.splice(community.members.indexOf(user._id), 1);
    await community.save();

    res
      .status(200)
      .json({ message: "Unsubscribed from the community successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.isSubscribed = async (req, res) => {
  try {
    const { communityName } = req.query;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const isSubscribed = user.subscribedCommunities.includes(community._id);
    res.status(200).json({ isSubscribed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.topCommunities = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 250;
    const skip = (page - 1) * limit;

    const totalCommunities = await Community.countDocuments({
      communityType: "Public",
    });
    const totalPages = Math.ceil(totalCommunities / limit);

    const communities = await Community.find({ communityType: "Public" })
      .sort({ membersCount: -1 })
      .skip(skip)
      .limit(limit)
      .select(
        "name category communityType description image membersCount rules dateCreated communityBanner"
      )
      .populate("rules", "title description reportReason");

    if (communities.length == 0) {
      return res.status(404).json({ message: "No Public communities found" });
    }
    res.status(200).json({
      communities: communities,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.aggregate([
      {
        $lookup: {
          from: "rules",
          localField: "rules",
          foreignField: "_id",
          as: "populatedRules",
        },
      },
      { $unwind: "$populatedRules" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          category: { $first: "$category" },
          communityType: { $first: "$communityType" },
          description: { $first: "$description" },
          image: { $first: "$image" },
          membersCount: { $first: "$membersCount" },
          rules: { $push: "$populatedRules" },
          dateCreated: { $first: "$dateCreated" },
          communityBanner: { $first: "$communityBanner" },
        },
      },
    ]);

    if (communities.length === 0) {
      return res.status(404).json({ message: "No communities found" });
    }

    res.status(200).json(communities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.randomCategory = async (req, res) => {
  try {
    let randomCommunity,
      attempts = 0;
    do {
      randomCommunity = await Community.aggregate([{ $sample: { size: 1 } }]);
      attempts++;
    } while (
      !randomCommunity[0].category /*&& attempts != Community.countDocuments()*/
    );
    let communities;
    if (randomCommunity[0].category) {
      const randomCategory = randomCommunity[0].category;

      communities = await Community.aggregate([
        { $match: { category: randomCategory } },
        {
          $lookup: {
            from: "rules",
            localField: "rules",
            foreignField: "_id",
            as: "populatedRules",
          },
        },
        { $unwind: "$populatedRules" },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            category: { $first: "$category" },
            communityType: { $first: "$communityType" },
            description: { $first: "$description" },
            image: { $first: "$image" },
            membersCount: { $first: "$membersCount" },
            rules: { $push: "$populatedRules" },
            dateCreated: { $first: "$dateCreated" },
            communityBanner: { $first: "$communityBanner" },
          },
        },
      ]);
    } else {
      return res.status(404).json({ message: "No random communities found" });
    }

    res.status(200).json(communities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.specificCategory = async (req, res) => {
  try {
    const category = req.query.category;

    if (!category) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const communities = await Community.aggregate([
      { $match: { category } },
      {
        $lookup: {
          from: "rules",
          localField: "rules",
          foreignField: "_id",
          as: "populatedRules",
        },
      },
      { $unwind: "$populatedRules" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          category: { $first: "$category" },
          communityType: { $first: "$communityType" },
          description: { $first: "$description" },
          image: { $first: "$image" },
          membersCount: { $first: "$membersCount" },
          dateCreated: { $first: "$dateCreated" },
          communityBanner: { $first: "$communityBanner" },
          rules: { $addToSet: "$populatedRules" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          category: 1,
          communityType: 1,
          description: {
            $cond: {
              if: { $eq: ["$description", null] },
              then: "",
              else: "$description",
            },
          },
          image: {
            $cond: { if: { $eq: ["$image", null] }, then: "", else: "$image" },
          },
          membersCount: 1,
          dateCreated: {
            $cond: {
              if: { $eq: ["$dateCreated", null] },
              then: new Date(),
              else: "$dateCreated",
            },
          },
          communityBanner: {
            $cond: {
              if: { $eq: ["$communityBanner", null] },
              then: "",
              else: "$communityBanner",
            },
          },
          rules: {
            $cond: {
              if: { $eq: [{ $size: "$rules" }, 0] },
              then: [],
              else: "$rules",
            },
          },
        },
      },
    ]);

    if (communities.length == 0) {
      return res.status(404).json({
        message: "No communities found for the specified category",
      });
    }

    res.status(200).json(communities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const { name, is18plus, communityType } = req.body;
    if (!name || typeof is18plus !== "boolean" || !communityType) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const createdCommunity = new Community({
      name: name,
      is18plus: is18plus,
      communityType: communityType,
      creator: user,
      members: [user],
      moderators: [user],
    });

    const newModerator = new Moderator({
      username: user.username,
      communityName: createdCommunity.name,
      isAccepted: true,
    });
    const existingCommunity = await Community.findOne({
      name: name,
    });
    if (existingCommunity) {
      return res
        .status(403)
        .json({ message: "Community name is not available" });
    }
    user.subscribedCommunities.push(createdCommunity._id);
    user.moderatedCommunities.push(createdCommunity._id);
    await newModerator.save();
    await user.save();
    await createdCommunity.save();
    return res.status(200).send({ message: "Community created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
