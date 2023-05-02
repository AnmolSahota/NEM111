let express = require("express");
let cors = require("cors");
const { connection } = require("./db");
const { userRoute } = require("./Routes/User.route");
const { postRoute } = require("./Routes/Post.route");
const { auth } = require("./middleware/auth.middleware");
let app = express();
app.use(cors())
app.use(express.json());
app.use("/users", userRoute);
app.get("/", (req, res) => {
  res.send("Home-page");
});

app.use(auth);
app.use("/posts", postRoute);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Db Connected");
  } catch (error) {
    console.log(error);
    console.log("error occured");
  }
});
