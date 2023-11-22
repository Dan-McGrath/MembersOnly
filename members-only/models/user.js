const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership_status: {type: String, required: true, enum: ['Public', 'Private']}
});

UserSchema.virtual("full_name").get(function () {
  return `${this.last_name}, ${this.first_name}`;
});

UserSchema.virtual("url").get(function () {
  return `/messageboard/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
