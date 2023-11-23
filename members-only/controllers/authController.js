const User = require("../models/user");
const bycrypt = require("bcryptjs");
const passport = require("passport");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.login = asyncHandler(async (req, res, next) => {
  res.render("log-in", {
    title: "Log in",
  });
});

exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

exports.sign_up = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", {
    title: "Sign Up",
  });
});

exports.sign_up_post = [
  body("first_name", "First name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
  body("username", "Username must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirm-password").custom((value, { req }) => {
    if (value === req.body.password) {
      return true;
    } else {
      throw new Error("Passwords do not match");
    }
  }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const hash = await bycrypt.hash(req.body.password, 10);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: hash,
    });

    if (!errors.isEmpty()) {
      res.render("sign-up-form", {
        title: "Sign Up",
        user: user,
        errors: errors.array(),
      });
    } else {
      await user.save();
      res.redirect("/login");
    }
  }),
];

exports.log_out = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
