var jwt = require("jsonwebtoken");
let auth = (req, res, next) => {
  let token = req.headers.authorization;
  try {
    let decoded = jwt.verify(token, "evaluation");
    req.body.username = decoded.username;
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.send(error);
  }
};

module.exports = { auth };
