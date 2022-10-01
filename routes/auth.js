const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController.js");

router.get("/sign-up", controller.sign_up_get);
router.get("/log-in", controller.log_in_get);
router.get("/log-out", controller.log_out_get);
router.post("/log-in", controller.log_in_post);
router.post("/sign-up", controller.sign_up_post);

module.exports = router;
