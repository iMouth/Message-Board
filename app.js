const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const formRouter = require("./routes/new");
const start = require("./mongo");
require("dotenv").config();
const app = express();

start();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport.use(
  new LocalStrategy((email, password, done) => {
    console.log("GOT TO LOCAL STRATEGY");
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.log("ERROR ON FIND ONE");
        return done(err);
      }
      if (!user) {
        console.log("NO USER");
        return done(null, false, { message: "Incorrect Username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          console.log("ERROR ON COMPARE");
          return done(err);
        } else if (res) {
          console.log("SUCCESS");
          return done(null, user);
        } else {
          console.log("WRONG PASSWORD");
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

app.use(session({ secret: process.env.SECRET_SESSION, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Access the user object from anywhere in our application
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/", formRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on " + port));

module.exports = app;
