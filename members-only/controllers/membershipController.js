const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.change_membership_get = asyncHandler(async (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/login");
  }
  res.render("membership", {
    title: "Change Membership",
  });
});

exports.change_membership_post = asyncHandler(async (req, res, next) => {});
