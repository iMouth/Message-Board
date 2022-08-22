var express = require("express");
var router = express.Router();
const controller = require("../controllers/indexController.js");

router.get("/", controller);

module.exports = router;
