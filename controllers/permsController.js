const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const member_get = (req, res) => {
  res.render("member", { title: "Member", user: res.locals.currentUser });
};

const admin_get = (req, res) => {
  res.render("admin", { title: "Admin", user: res.locals.currentUser });
};

const member_post = (req, res) => {
  let admin = mongoose.connection.db.collection("admin");
  let password = admin.findOne({ memberPass: { $exists: true } }).then((result) => {
    bcrypt.compare(req.body.password, result.memberPass, (err, result) => {
      if (result) {
        User.findOneAndUpdate({ _id: res.locals.currentUser._id }, { member: true }, (err, result) => {
          if (err) throw err;
          res.redirect("/");
        });
      } else {
        res.redirect("/member");
      }
    });
  });
};

const admin_post = (req, res) => {
  let admin = mongoose.connection.db.collection("admin");
  let password = admin.findOne({ adminPass: { $exists: true } }).then((result) => {
    bcrypt.compare(req.body.password, result.adminPass, (err, result) => {
      if (result) {
        User.findOneAndUpdate({ _id: res.locals.currentUser._id }, { admin: true }, (err, result) => {
          if (err) throw err;
          res.redirect("/");
        });
      } else {
        res.redirect("/admin");
      }
    });
  });
};

module.exports = { member_get, admin_get, member_post, admin_post };
