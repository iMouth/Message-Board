const { MongoClient, ServerApiVersion } = require("mongodb");
const { messages } = require("./modules/messages");
const mongoose = require("mongoose");
require("dotenv").config();

const start = () => {
  const uri = process.env.URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  client.connect((err) => {
    if (!err) {
      const collection = client.db("Members-Only").collection("users");
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

module.exports = start;
