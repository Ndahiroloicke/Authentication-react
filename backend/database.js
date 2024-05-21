const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
    console.log("failed to connect");
  });

const LoginS = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});
const Database = new mongoose.model("mwan",LoginS);
module.exports = Database