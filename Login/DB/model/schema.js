const mongoose = require("mongoose");
require("../connection.js");

const Users = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  google_id: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("users", Users);
