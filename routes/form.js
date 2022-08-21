var express = require("express");
var router = express.Router();
const messages = require("../public/javascripts/messages");
const format = { dateStyle: "long", timeStyle: "medium" };

router.get("/new", (req, res, next) => {
  res.render("form", { title: "New Message" });
});

router.post("/new", (req, res) => {
  const info = req.body;

  messages.push({
    user: info.author,
    text: info.message,
    added: new Date().toLocaleString("en-us", format),
  });
  res.redirect("/");
});

module.exports = router;
