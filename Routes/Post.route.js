let express = require("express");
const { postModel } = require("../Model/Post.model");

let postRoute = express.Router();

postRoute.get("/", async (req, res) => {
  let { device } = req.query;
  let query = {};
  query.userId = req.body.userId;
  if (device) {
    query.device = device;
  }
  try {
    let post = await postModel.find(query);
    res.send(post);
  } catch (error) {
    res.send({ msg: "error occrued", err: error });
  }
});

postRoute.post("/create", async (req, res) => {
  try {
    let data = new postModel(req.body);
    await data.save();
    res.send({ msg: "post created" });
  } catch (error) {
    res.send({ msg: "error occrued", err: error });
  }
});

postRoute.patch("/update/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await postModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ msg: "Post updated" });
  } catch (error) {
    res.send({ msg: "error occrued", err: error.message });
  }
});

postRoute.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await postModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Post deleted" });
  } catch (error) {
    res.send({ msg: "error occrued", err: error.message });
  }
});

module.exports = { postRoute };
