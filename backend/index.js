const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.js");
const {
  userLogin,
  userRegister,
  checkUser,
  GetUser,
} = require("./controllers/UserAuth.js");
const app = express();
const UserAuthorizationMiddleware = require("./middleware/user-authorization.js");
app.use(cors());
app.use(express.json());

connectDB();

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.post("/login", userLogin);

app.post("/register", userRegister);

app.get("/check", checkUser);

app.get("/profile", UserAuthorizationMiddleware, GetUser);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
