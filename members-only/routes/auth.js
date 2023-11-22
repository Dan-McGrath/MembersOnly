const express = require("express");
const router = express.Router();

router.get("/login", function (req, res, next) {
  res.render("log-in", {
    title: "Log in",
  });
});

router.get("/sign_up", function (req, res, next) {
  res.render("sign-up-form", {
    title: "Sign Up",
  });
});

module.exports = router;
