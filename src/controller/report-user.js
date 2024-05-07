const ReportUser = require("../models/user");
const jwt = require("jsonwebtoken");
const Report = require("../models/report.js");

exports.reportUser = async (req, res) => {
  try {
    const username = req.body.username;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const user = await ReportUser.getUserByEmailOrUsername(username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const toReportID = user._id;
    const reporterID = req.user._id;
    if (toReportID.equals(reporterID)) {
      return res.status(400).json({ error: "user cannot report himself" });
    }
    const { reason, subreason } = req.body;

    if (!toReportID || !reporterID) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!reason) {
      return res.status(400).send({
        message: "invalid report data must send reason",
      });
    }

    const report = new Report({
      userId: reporterID,
      toReportID: toReportID,
      reason: reason,
      subreason: subreason,
    });

    await report.save();
    const response = {
      description: "User reported successfully",
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
