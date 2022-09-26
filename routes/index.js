var express = require("express");
var router = express.Router();
const controller = require("../controllers/indexController.js");

router.get("/", controller.index_get);
router.get("/sign-up", controller.sign_up);
router.get("/log-in", controller.log_in);

module.exports = router;
