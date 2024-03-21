const ReportUser = require("../models/user");

exports.reportUser = async (req, res) => {
  //const followerID = req.user;

  try {
    const toReportID = req.body.userID;
    const reporterID = req.body.followID; //will be removed
    const reason = req.body.reason;
    if (!toReportID) {
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
    res.status(500).json({ error: "Internal server error" });
  }
};
