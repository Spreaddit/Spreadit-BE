const mongoose = require("mongoose");
require("./user");
require("./post");
require("./comment");
require("./community");

const SearchLogSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["normal", "community", "user"],
      required: true,
    },
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "community",
      required: function () {
        return this.type === "community";
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: function () {
        return this.type === "user";
      },
    },
    searchedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isInProfile: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SearchLog = mongoose.model("SearchLog", SearchLogSchema);

module.exports = SearchLog;
