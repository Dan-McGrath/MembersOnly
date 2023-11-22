const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.login = asyncHandler(async (req, res, next) => {
  res.render("log-in", {
    title: "Log in",
  });
});

exports.login_post = asyncHandler(async (req, res, next) => {
  res.render("log-in", {
    title: "Log in",
  });
});

exports.sign_up = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", {
    title: "Sign Up",
  });
});

exports.sign_up_post = asyncHandler(async (req, res, next) => {});
