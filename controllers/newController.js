const { messages, makeDate } = require("../modules/messages");

const new_create_get = (req, res) => {
  res.render("form", { title: "New Message" });
};

const new_create_post = (req, res) => {
  const info = req.body;

  messages.push({
    user: info.name,
    text: info.text,
    added: makeDate(),
  });
  res.redirect("/");
};

module.exports = { new_create_get, new_create_post };
