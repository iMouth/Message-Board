const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user");

const member_get = (req, res) => {
  res.render("member", { title: "Member", user: res.locals.currentUser });
};

const admin_get = (req, res) => {
  res.render("admin", { title: "Admin", user: res.locals.currentUser });
};

const member_post = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) throw err;
    let collection = mongoose.connection.db.collection("users");
    let password = collection.findOne({ memberPass: hashedPassword });
    if (password) {
      User.findOneAndUpdate({ email: res.locals.currentUser.email }, { member: true }, (err, user) => {
        if (err) throw err;
        res.redirect("/");
      });
    }
  });
};

const admin_post = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) throw err;

    let collection = mongoose.connection.db.collection("users");
    let password = collection.findOne({ adminPass: hashedPassword });
    if (password) {
      User.findOneAndUpdate({ email: res.locals.currentUser.email }, { admin: true }, (err, user) => {
        if (err) throw err;
        res.redirect("/");
      });
    }
  });
};

module.exports = { member_get, admin_get, member_post, admin_post };
