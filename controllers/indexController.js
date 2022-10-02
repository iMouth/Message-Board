const { messages } = require("../modules/messages");
const mongoose = require("mongoose");

const index_get = (req, res) => {
  messages.length = 0;
  collection = mongoose.connection.db.collection("messages");
  collection.find({}).toArray((err, result) => {
    if (err) throw err;
    result.forEach((message) => messages.push(message));
    if (res.locals.currentUser) {
      res.render("index", { title: "Home", messages, user: res.locals.currentUser });
    } else {
      res.render("index", { title: "Home", messages, user: null });
    }
  });
};

const message_delete = (req, res) => {
  if (res.locals.currentUser.admin) {
    collection = mongoose.connection.db.collection("messages");
    collection.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
};

module.exports = { index_get, message_delete };
