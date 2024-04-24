const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../models/User");

const userRegister = async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    if (!secret) {
      return res
        .status(400)
        .json({ success: false, message: "Secret is required" });
    }
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return res
        .status(201)
        .json({ success: false, message: "User already exist try to login" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashPass,
      secret,
    });
    res.send({ success: true, message: { name, email, secret } });
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status().json({
        success: false,
        message: "User doesn't exist! Register to continue",
      });
    }
    const userPass = user.password;
    const check = await bcrypt.compare(password, userPass);
    if (!check) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password or email",
      });
    }
    const token = await jsonwebtoken.sign(
      { email: user.email },
      "JSON_SECRET_KEY"
    );

    return res.status(200).json({
      success: true,
      message: "User registration done successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        mobile: user.mobile,
        token,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const checkUser = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "User doesn't exist" });
  }
  return res.json({ success: true, message: "User exist" });
};

const GetUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      res.status(498).json({ success: false, message: "Invalid token" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

module.exports = { userLogin, userRegister, checkUser, GetUser };
