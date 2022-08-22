const { messages } = require("../modules/messages");
require("dotenv").config();

const index_create_get = (req, res) => {
  res.render("index", { title: "Message Board", messages });
};

module.exports = index_create_get;
