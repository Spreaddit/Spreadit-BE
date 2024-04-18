const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const NotificationType = mongoose.model(
  "notificationType",
  notificationTypeSchema
);

module.exports = NotificationType;
