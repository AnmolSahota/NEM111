let mongoose = require("mongoose");

let postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    userId: String,
    username: String,
  },
  {
    versionKey: false,
  }
);
let postModel = mongoose.model("post", postSchema);

module.exports = { postModel };
