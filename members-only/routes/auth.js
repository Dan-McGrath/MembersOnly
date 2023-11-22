const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");

router.get("/login", auth_controller.login);
router.post("/login", auth_controller.login_post);

router.get("/sign_up", auth_controller.sign_up);

router.post("/sign_up", auth_controller.sign_up_post);

module.exports = router;
