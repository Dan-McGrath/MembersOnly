const express = require("express");
const router = express.Router();

const messageboard_controller = require("../controllers/messageController");

/* GET users listing. */
router.get("/", messageboard_controller.messageboard);

module.exports = router;
