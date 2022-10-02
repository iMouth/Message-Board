const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const sign_up_get = (req, res) => {
  res.render("sign-up", { title: "Sign Up", errors: [], user: null });
};

const log_in_get = (req, res) => {
  if (res.locals.currentUser) {
    res.redirect("/");
  } else {
    res.render("log-in", { title: "Log In", errors: [], user: null });
  }
};

const log_in_post = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })(req, res, next);
};

const sign_up_post = [
  body("confirm-password", "Passwords do not match").custom((value, { req }) => value === req.body.password),
  body("email").isEmail().withMessage("Please enter a valid email address").escape(),
  body("password").trim().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long").escape(),
  body("first-name").trim().isLength({ min: 1 }).withMessage("First name must be at least 1 characters long").escape(),
  body("last-name").trim().isLength({ min: 1 }).withMessage("Last name must be at least 1 characters long").escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("sign-up", { title: "Sign Up", user: null, errors: errors.array() });
    }
    await User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.render("sign-up", { title: "Sign Up", user: null, errors: [{ msg: "Email already in use" }] });
      }
    });

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
        member: false,
        admin: false,
      }).save((err) => {
        if (err) {
          return next(err);
        }
        console.log("User created");
        res.redirect("/log-in");
      });
    });
  },
];

const log_out_get = (req, res) => {
  req.logout(() => res.redirect("/"));
};

module.exports = { sign_up_get, log_in_get, log_in_post, sign_up_post, log_out_get };
