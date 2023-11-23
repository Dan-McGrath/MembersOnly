const express = require("express");
const router = express.Router();

const messageboard_controller = require("../controllers/messageController");

/* GET users listing. */
router.get("/", messageboard_controller.messageboard);
router.post('/', messageboard_controller.messageboard_post)

module.exports = router;
