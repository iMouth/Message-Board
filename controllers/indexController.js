const { messages } = require("../modules/messages");
const mongoose = require("mongoose");
require("dotenv").config();

const index_get = (req, res) => {
  messages.length = 0;
  collection = mongoose.connection.db.collection("messages");
  collection.find({}).toArray((err, result) => {
    if (err) throw err;
    result.forEach((message) => {
      messages.push(message);
    });
    if (res.locals.currentUser) {
      res.render("index", { title: "Home", messages, user: res.locals.currentUser });
    } else {
      res.render("index", { title: "Home", messages, user: null });
    }
  });
};

module.exports = { index_get };
