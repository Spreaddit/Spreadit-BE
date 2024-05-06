const ReportUser = require("../models/user");
const jwt = require("jsonwebtoken");
const Report = require("../models/report.js");

exports.reportUser = async (req, res) => {
  //const followerID = req.user;

  try {
    const username = req.body.username;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const user = await ReportUser.getUserByEmailOrUsername(username);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    const toReportID = user._id;
    const reporterID = req.user._id;
    if (toReportID.equals(reporterID)) {
      console.log("user cannot report himself");
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

    // const reporterUser = await ReportUser.findByIdAndUpdate(
    //   reporterID,
    //   { $addToSet: { reportedUsers: { id: toReportID, reason: reason } } },
    //   { new: true }
    // );
    // const toReportUser = await ReportUser.findById(toReportID);

    const response = {
      description: "User reported successfully",
    };
    res.status(200).json(response);
  } catch (err) {
    console.error("Error report user", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
