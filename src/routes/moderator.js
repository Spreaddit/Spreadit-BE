const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const router = express.Router();
router.use(passport.initialize());
router.use(cookieParser("spreaditsecret"));
const auth = require("../middleware/authentication");
const upload = require("../service/fileUpload");
const modController = require("../controller/moderator-controller.js");

router.route("/rule/add").post(auth.authentication, modController.addRule);

router
  .route("/rule/remove")
  .post(auth.authentication, modController.removeRule);

router.route("/rule/edit").put(auth.authentication, modController.editRule);

router
  .route("/community/:communityName/rules")
  .get(auth.authentication, modController.getRules);

router
  .route("/removal-reason/add")
  .post(auth.authentication, modController.addRemovalReason);

router
  .route("/removal-reason/remove")
  .post(auth.authentication, modController.removeRemovalReason);

router
  .route("/removal-reason/edit")
  .put(auth.authentication, modController.editRemovalReason);

router
  .route("/community/:communityName/removal-reasons")
  .get(auth.authentication, modController.getRemovalReasons);

router
  .route("/community/moderation/:communityName/:username/leave")
  .post(auth.authentication, modController.leaveModeration);

router
  .route("/community/:communityName/get-info")
  .get(auth.authentication, modController.getCommunityInfo);

router
  .route("/community/moderation/:communityName/contributors")
  .get(auth.authentication, modController.getContributors);

router
  .route("/community/moderation/:communityName/:username/add-contributor")
  .post(auth.authentication, modController.addContributor);

router
  .route("/community/moderation/:communityName/:username/remove-contributor")
  .delete(auth.authentication, modController.removeContributor);

router
  .route("/community/moderation/:communityName/:username/is-contributor")
  .get(auth.authentication, modController.isContributor);

router.route("/community/:communityName/edit-info").post(
  auth.authentication,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "communityBanner", maxCount: 1 },
  ]),
  modController.editCommunityInfo
);

router
  .route("/community/:communityName/settings")
  .get(auth.authentication, modController.getCommunitySettings)
  .put(auth.authentication, modController.editCommunitySettings);

router
  .route("/community/muted")
  .get(auth.authentication, modController.getMutedCommunities);

router
  .route("/community/moderation/:communityName/moderators")
  .get(auth.authentication, modController.getCommunityModerators);

router
  .route("/community/moderation/:communityName/moderators/editable")
  .get(auth.authentication, modController.getCommunityEditableModerators);

router
  .route("/community/moderation/:communityName/invited-moderators")
  .get(auth.authentication, modController.getCommunityInvitedModerators);

router
  .route("/community/moderation/:communityName/:username/remove-invite")
  .delete(auth.authentication, modController.removeModeratorInvitaton);

router
  .route("/community/moderation/:communityName/:username/is-moderator")
  .get(auth.authentication, modController.isModerator);

router
  .route("/community/moderation/:communityName/:username/is-invited")
  .get(auth.authentication, modController.isInvited);

router
  .route("/community/moderation/user/:username")
  .get(auth.authentication, modController.getModeratedCommunities);

router
  .route("/community/moderation/:communityName/:username/permissions")
  .put(auth.authentication, modController.updateModerationPermissions);

router
  .route("/community/moderation/:communityName/moderators/:username")
  .delete(auth.authentication, modController.removeModerator);

router
  .route("/community/:communityName/insights")
  .get(auth.authentication, modController.getCommunityInsights);

router
  .route("/community/:communityName/:username/get-permissions")
  .get(auth.authentication, modController.getPermissions);

module.exports = router;
