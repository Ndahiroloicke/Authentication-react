const express = require("express");
const bycrypt = require("bcrypt");
const database = require("./database");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/register", async (req, res) => {
  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(req.body.password, salt);
  const data = {
    password: hash,
    username: req.body.user,
    email: req.body.email,
  };
  await database.insertMany([data]);
});
app.post("/login", async (req, res) => {
  try {
    const user = await database.findOne({ username: req.body.user }).exec();
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const verified = await bycrypt.compare(req.body.password, user.password);
    if (verified) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ error: "Login failed" });
  }
});

database();
app.listen(9000, () => {
  console.log("Listening on port 9000");
});
