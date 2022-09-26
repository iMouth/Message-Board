const { messages } = require("../modules/messages");

require("dotenv").config();


const index_get = (req, res) => {
  res.render("index", { title: "Message Board", messages });
};

const sign_up = (req, res) => {
  res.render("sign-up", { title: "Sign Up" });
};

const log_in = (req, res) => {
  res.render("log-in", { title: "Log In" });
};

module.exports = { index_get, sign_up, log_in };
