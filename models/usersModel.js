const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  bio: String,
  age: Number,
  location: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
