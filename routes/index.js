var express = require("express");
var router = express.Router();
const controller = require("../controllers/indexController.js");

router.get("/", controller.index_get);
router.get("/sign-up", controller.sign_up_get);
router.get("/log-in", controller.log_in_get);
router.post("/log-in", controller.log_in_post);
router.post("/sign-up", controller.sign_up_post);

module.exports = router;
