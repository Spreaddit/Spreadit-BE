const express = require("express");
const router = express.Router();
const banInviteController = require("../controller/ban-invite-controller");
const auth = require("../middleware/authentication");
router
  .route("/community/moderation/:communityName/:username/invite")
  .post(auth.authentication, banInviteController.inviteModerator);

router
  .route("/community/moderation/:communityName/accept-invite")
  .post(auth.authentication, banInviteController.acceptInvite);

router
  .route("/community/moderation/:communityName/decline-invite")
  .post(auth.authentication, banInviteController.declineInvite);

router
  .route("/community/moderation/:communityName/:username/ban")
  .post(auth.authentication, banInviteController.banUser)
  .patch(auth.authentication, banInviteController.editBan);

router
  .route("/community/moderation/:communityName/:username/unban")
  .post(auth.authentication, banInviteController.unbanUser);
router
  .route("/community/moderation/:communityName/:username/is-banned")
  .get(auth.authentication, banInviteController.checkUserBanStatus);

router
  .route("/community/moderation/:communityName/banned-users")
  .get(auth.authentication, banInviteController.getBannedUsersInCommunity);
module.exports = router;
