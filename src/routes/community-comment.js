const express = require("express");
const router = express.Router();
const communityCommentController = require("../controller/community-comment");
const upload = require("../service/fileUpload");
const auth = require("../middleware/authentication");

//I need to check ek approved users dah while creating a comment or a reply to a comment
//I need to check mawdo3 el settings while creating comments bardo

router
    .route("/community/moderation/:communityName/spam-comment/:commentId")
    .post(auth.authentication, communityCommentController.spamComment);

router
    .route("/community/moderation/:communityName/get-spam-comments")
    .get(auth.authentication, communityCommentController.getSpamComments);

router
    .route("/community/moderation/:communityName/:commentId/lock-comment ")
    .get(auth.authentication, communityCommentController.lockComment)

router
    .route("/community/moderation/:communityName/:commentId/unlock-comment:")
    .get(auth.authentication, communityCommentController.unlockComment)

router
    .route("/community/moderation/:communityName/:commentId/approve-comment")
    .get(auth.authentication, communityCommentController.approveComment)

router
    .route("/community/moderation/:communityName/:commentId/remove-comment")
    .get(auth.authentication, communityCommentController.removeComment)

router
    .route("/community/moderation/communityName/get-edited-comments")
    .get(auth.authentication, communityCommentController.getEdititedCommentsHistory)
module.exports = router;
