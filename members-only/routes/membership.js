const express = require("express");
const router = express.Router();

const membership_controller = require("../controllers/membershipController");

router.get("/private", membership_controller.change_membership_private_get);
router.post("/private", membership_controller.change_membership_private_post);
router.get("/admin", membership_controller.change_membership_admin_get);
router.post("/admin", membership_controller.change_membership_admin_post);

module.exports = router;
