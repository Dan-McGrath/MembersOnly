const User = require("../models/user");
require("dotenv").config();

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.change_membership_private_get = asyncHandler(async (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/login");
  }
  res.render("private-membership", {
    title: "Change Membership",
  });
});

exports.change_membership_private_post = [
  body("private-passcode")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value) => {
      if (value !== process.env.PRIVATE_PASSCODE) {
        throw new Error("Incorrect passcode");
      }
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = await User.findById(req.user);

    const newUser = new User({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      password: user.password,
      membership_status: "Private",
      _id: user._id,
    });

    if (!errors.isEmpty()) {
      res.render("private-membership", {
        title: "Change Membership",
        errors: errors.array(),
      });
      return;
    } else {
      await User.findByIdAndUpdate(req.user, newUser, {});
      res.redirect("/");
    }
  }),
];

exports.change_membership_admin_get = asyncHandler(async (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/login");
  }
  res.render("admin-membership", {
    title: "Change Membership",
  });
});

exports.change_membership_admin_post = [
  body("admin-passcode")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value) => {
      if (value !== process.env.ADMIN_PASSCODE) {
        throw new Error("Incorrect passcode");
      }
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = await User.findById(req.user);
    console.log(user)

    const newUser = new User({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      password: user.password,
      membership_status: "Admin",
      _id: user._id,
    });

    if (!errors.isEmpty()) {
      res.render("admin-membership", {
        title: "Change Membership",
        errors: errors.array(),
      });
      return;
    } else {
      await User.findByIdAndUpdate(req.user, newUser, {});
      res.redirect("/");
    }
  }),
];
