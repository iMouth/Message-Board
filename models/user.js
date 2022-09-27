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
    requiredq: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    ttpe: String,
    required: true;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
