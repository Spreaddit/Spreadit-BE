const express = require("express");
const User = require("../models/user.js");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const router = express.Router();
const Community = require("../models/community.js");
const Rule = require("../models/rule.js");
router.use(passport.initialize());
router.use(cookieParser("spreaditsecret"));
const auth = require("../middleware/authentication");

//TODO: Get rules
//TODO: handling if user is moderator
//TODO: handling restricted and private communities
//TODO: delete community
//TODO: Handling user community
//TODO: auth for all routes
router.post("/rule/add", auth.authentication, async (req, res) => {
  try {
    const { title, description, reportReason, communityName } = req.body;

    if (!title || !communityName) {
      return res.status(400).json({ message: "Invalid rule data" });
    }
    let existingRule = await Rule.findOne({
      title: title,
      communityName: communityName,
    });
    if (existingRule) {
      return res.status(403).json({ message: "Title already used" });
    }
    const ruleReportReason = reportReason || title;

    existingRule = new Rule({
      title: title,
      description: description || "",
      reportReason: ruleReportReason,
      communityName: communityName,
    });

    const userId = req.user._id;
    const user = await User.findById(userId);
    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (!community.moderators.includes(user._id)) {
      return res.status(402).json({ message: "You are not a moderator of this community" });
    }
    await existingRule.save();
    community.rules.push(existingRule._id);
    await community.save();
    res.status(200).json({ message: "Rule added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/rule/remove", auth.authentication, async (req, res) => {
  try {
    const { communityName, title } = req.body;

    if (!communityName || !title) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!community.moderators.includes(user._id)) {
      return res.status(402).json({ message: "Not a moderator" });
    }

    const rule = await Rule.findOne({ title: title });

    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    const index = community.rules.indexOf(rule._id);
    if (index == -1) {
      return res.status(404).json({ message: "Rule not found" });
    }

    community.rules.splice(index, 1);
    await community.save();
    await Rule.findByIdAndDelete(rule._id);
    res.status(200).json({ message: "Rule removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/community/add-to-favourites", auth.authentication, async (req, res) => {
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
      return res.status(402).json({ message: "Community is already in favorites" });
    }

    user.favouriteCommunities.push(community._id);
    await user.save();

    res.status(200).json({ message: "Community added to favorites successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/community/remove-favourite", auth.authentication, async (req, res) => {
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

    res.status(200).json({ message: "Community removed from favorites successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/community/is-favourite", auth.authentication, async (req, res) => {
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
});

router.post("/community/mute", auth.authentication, async (req, res) => {
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
});

router.post("/community/unmute", auth.authentication, async (req, res) => {
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
});

router.get("/community/is-mute", auth.authentication, async (req, res) => {
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
});

router.get("/community/muted", auth.authentication, async (req, res) => {
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
});

router.post("/community/subscribe", auth.authentication, async (req, res) => {
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

    if (community.communityType == "Private" || community.communityType == "Restriced") {
      return res.status(403).json({ message: "Restriced or Private community" });
    }

    if (user.subscribedCommunities.includes(community._id)) {
      return res.status(400).json({ message: "User is already subscribed" });
    }

    user.subscribedCommunities.push(community._id);
    await user.save();
    community.membersCount += 1;
    community.members.push(user._id);
    await community.save();
    res.status(200).json({ message: "Subscribed to the community successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/community/unsubscribe", auth.authentication, async (req, res) => {
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
      return res.status(403).json({ message: "User isn't subscribed to community" });
    }

    const index = user.subscribedCommunities.indexOf(community._id);
    user.subscribedCommunities.splice(index, 1);
    await user.save();
    community.membersCount -= 1;
    community.members.splice(community.members.indexOf(user._id), 1);
    await community.save();

    res.status(200).json({ message: "Unsubscribed from the community successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/community/is-subscribed", auth.authentication, async (req, res) => {
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
});

router.get("/community/top-communities", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 250;
    const skip = (page - 1) * limit;

    const totalCommunities = await Community.countDocuments();
    const totalPages = Math.ceil(totalCommunities / limit);

    const communities = await Community.find({ communityType: "Public" })
      .sort({ membersCount: -1 })
      .skip(skip)
      .limit(limit)
      .select("name category communityType description image memberscount rules dateCreated communityBanner")
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
});

router.get("/community/random-category", async (req, res) => {
  try {
    let randomCommunity,
      attempts = 0;
    do {
      randomCommunity = await Community.aggregate([{ $sample: { size: 1 } }]);
      attempts++;
    } while (!randomCommunity[0].category /*&& attempts != Community.countDocuments()*/);
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
});

router.get("/community/get-specific-category", async (req, res) => {
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
          rules: { $push: "$populatedRules" },
          dateCreated: { $first: "$dateCreated" },
          communityBanner: { $first: "$communityBanner" },
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
});

router.get("/community/get-info", async (req, res) => {
  try {
    const communityName = req.query.communityName;

    if (!communityName) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const community = await Community.findOne({ name: communityName })
      .select("name category communityType description image membersCount rules dateCreated communityBanner")
      .populate("rules", "title description reportReason");

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.status(200).json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/community/create", auth.authentication, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const { name, is18plus, communityType } = req.body;
    if (!name || !is18plus || !communityType) {
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

    const existingCommunity = await Community.findOne({
      name: name,
    });
    if (existingCommunity) {
      return res.status(403).json({ message: "Community name is not available" });
    }
    user.subscribedCommunities.push(createdCommunity._id);
    await user.save();
    await createdCommunity.save();
    return res.status(200).send({ message: "Community created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
