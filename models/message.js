const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const messageSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  added: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Message, User };
