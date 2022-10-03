const { messages, makeDate } = require("../modules/messages");
const Message = require("../models/message");

const new_create_get = (req, res) => {
  if (!(res.locals.currentUser && (res.locals.currentUser.member == true || res.locals.currentUser.admin == true))) {
    res.redirect("/");
  } else {
    res.render("form", { title: "New Message", user: res.locals.currentUser });
  }
};

const new_create_post = (req, res) => {
  const info = req.body;

  const message = new Message({
    user: info.name,
    text: info.text,
    avatar: res.locals.currentUser.avatar,
    added: makeDate(),
  });
  message
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
};

module.exports = { new_create_get, new_create_post };
