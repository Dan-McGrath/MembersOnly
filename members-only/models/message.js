const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model("Message", MessageSchema);