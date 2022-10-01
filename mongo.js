const createError = require("http-errors");
const { messages } = require("./modules/messages");
const mongoose = require("mongoose");
require("dotenv").config();

const start = () => {
  const uri = process.env.URI;
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Database"))
    .catch((err) => createError(500));
};

module.exports = start;
