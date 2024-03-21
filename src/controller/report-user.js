const ReportUser = require("../models/user");
const jwt = require("jsonwebtoken");

exports.reportUser = async (req, res) => {
  //const followerID = req.user;

  try {
    const username = req.body.username;
    const user = await ReportUser.getUserByEmailOrUsername(username);
    const toReportID = user._id;
    const token = req.body.token;
    const decodedToken = jwt.decode(token);
    const reporterID = decodedToken._id;
    const reason = req.body.reason;
    if (!toReportID || !reporterID) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const reporterUser = await ReportUser.findByIdAndUpdate(
      reporterID,
      { $addToSet: { reportedUsers: { id: toReportID, reason: reason } } },
      { new: true }
    );
    const toReportUser = await ReportUser.findById(toReportID);
    if (!reporterUser) {
      console.error("please login first:");
      return res.status(404).json({ error: "please loin first" });
    }
    if (!toReportUser) {
      console.error("user not found:");
      return res.status(404).json({ error: "user not found" });
    }
    const response = {
      status: "success",
    };
    res.status(200).json(response);
  } catch (err) {
    console.error("Error report user", err);
    res.status(500).json({
      status: "fail",
      message: "Error report user",
    });
  }
};
