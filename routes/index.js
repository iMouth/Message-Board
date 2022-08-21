var express = require("express");
const { title } = require("process");
var router = express.Router();
const messages = require("../public/javascripts/messages");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Message Board", messages });
});

module.exports = router;
