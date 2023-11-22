const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const User = require("../models/user");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Message Board", user: req.user });
});

exports.index_post = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Message Board", user: req.user });
});
