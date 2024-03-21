const express = require("express");
const router = express.Router();
const reportUserController = require("../controller/report-user");
const auth = require("../middleware/authentication");

router.route("/report", auth).post(reportUserController.reportUser);

module.exports = router;
