const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { messages } = require("../modules/messages");

require("dotenv").config();

const mongoDb = process.env.URI;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const index_get = (req, res) => {
  res.render("index", { title: "Message Board", messages });
};

const sign_up_get = (req, res) => {
  res.render("sign-up", { title: "Sign Up" });
};

const log_in_get = (req, res) => {
  res.render("log-in", { title: "Log In" });
};

const log_in_post = (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  });
};

const sign_up_post = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body["first-name"],
      lastName: req.body["last-name"],
      avatar: req.body.character,
      status: "visitor",
    }).save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.redirect("/");
    });
  });
};

passport.use(
  new LocalStrategy((email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = { index_get, sign_up_get, log_in_get, log_in_post, sign_up_post };
