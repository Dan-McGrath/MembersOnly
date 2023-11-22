const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true, maxLength: 250, trim: true },
  time_stamp: { type: Date, default: Date.now },
});

MessageSchema.virtual("url").get(function () {
  return `/messageboard/message/${this._id}`;
});

module.exports = mongoose.model("Message", MessageSchema);
