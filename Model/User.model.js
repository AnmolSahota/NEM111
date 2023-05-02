let mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

let userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
