const { messages, makeDate } = require("../modules/messages");
const Message = require("../models/message");

const new_create_get = (req, res) => {
  res.render("form", { title: "New Message" });
};

const new_create_post = (req, res) => {
  const info = req.body;

  const message = new Message({
    user: info.name,
    text: info.text,
    added: makeDate(),
  });
  messages.unshift(message);
  message
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
};

module.exports = { new_create_get, new_create_post };
