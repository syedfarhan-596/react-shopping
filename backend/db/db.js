const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/react-shopping")
    .then(() => {
      console.log("Connected to db successfully");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectDB;
