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
module.exports = router;
