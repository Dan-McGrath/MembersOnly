const express = require("express");
const router = express.Router();

const membership_controller = require("../controllers/membershipController");

router.get("/", membership_controller.change_membership_get);
router.get("/", membership_controller.change_membership_post);

module.exports = router;
