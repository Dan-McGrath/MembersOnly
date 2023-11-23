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

exports.messageboard_post = [
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("message", "Message must not be empty")
    .trim()
    .isLength({ min: 1, max: 250 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const messages = await Message.find().exec();

    const message = new Message({
      user: req.user,
      title: req.body.title,
      message: req.body.message,
    });

    if (!errors.isEmpty()) {
      res.render("messageboard", {
        title: "Message Board",
        messages: messages,
        newMessage: message,
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect("/messageboard");
    }
  }),
];
