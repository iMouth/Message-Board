var express = require("express");
var router = express.Router();
const controller = require("../controllers/indexController.js");
const { messages } = require("../modules/messages");

router.get("/", controller);

module.exports = router;
