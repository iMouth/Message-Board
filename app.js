const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const formRouter = require("./routes/new");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { messages } = require("./modules/messages");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const start = () => {
  const uri = process.env.URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client.connect((err) => {
    if (!err) {
      const collection = client.db("User-Info").collection("messages");
      collection
        .find()
        .sort({ _id: -1 })
        .forEach((message) => messages.push(message))
        .catch(() => createError(500));
    } else createError(500);
  });
  client.close();
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).catch((err) => createError(500));
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

start();

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

module.exports = app;
