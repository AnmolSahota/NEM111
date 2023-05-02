let express = require("express");
const { userModel } = require("../Model/User.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  let { password } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      let user = new userModel({ ...req.body, password: hash });
      await user.save();
      res.send({
        msg: "user register succesfully",
      });
    });
  } catch (error) {
    res.status(401).send({
      error: error,
    });
  }
});
userRoute.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, async function (err, result) {
      if (result) {
        var token = jwt.sign(
          { userId: user._id, username: user.name },
          "evaluation"
        );

        res.send({ msg: "Login Succesfully", token: token });
      } else {
        res.status(401).send({
          msg: "wrong credential",
        });
      }
    });
  } else {
    res.send({
      msg: "wrong credential",
    });
  }
});
module.exports = { userRoute };
