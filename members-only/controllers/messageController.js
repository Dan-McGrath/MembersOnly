const Message = require("../models/message");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.messageboard = asyncHandler(async (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/login");
  }
  const messages = await Message.find().populate("user").exec();
  res.render("messageboard", {
    title: "Message Board",
    messages: messages,
  });
});
