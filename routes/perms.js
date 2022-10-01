const express = require("express");
const router = express.Router();
const controller = require("../controllers/permsController");

router.get("/member", controller.member_get);
router.get("/admin", controller.admin_get);
router.post("/member", controller.member_post);
router.post("/admin", controller.admin_post);

module.exports = router;
