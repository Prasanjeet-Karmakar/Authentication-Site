const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Connecting to the database:
const mongoose = require("mongoose");
const User = require("../Schemas/userSchema");
const Password = require("../Schemas/passwordSchema");
require("dotenv").config();

const TOKEN = process.env.TOKEN_SECRET;

mongoose
  .connect(process.env.URI)
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.log(e));

router.get("/", (req, res) => {
  res.status(200).send("Hello from server");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  try {
    const match = bcrypt.compare(req.body.password, user.password);
    if (match) {
      // console.log("User Entered");
      const token = jwt.sign({ userId: user.username }, TOKEN, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: "Authentication failed" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/register", async (req, res) => {
  if (req.body.username && req.body.password && req.body.email) {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const data = {
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
    };

    const check = await User.findOne({ username: data.username });
    if (!check) {
      try {
        const newUser = new User(data);
        await newUser.save();
      } catch (e) {
        console.log(e);
      }

      res.send("User Successfully added");
    } else {
      res.send("User already registered");
    }
  } else {
    res.send("Required field should be filled");
  }
});

router.post("/MainPage", async (req, res) => {
  const token = req.body.username;
  console.log(req.body);
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, TOKEN);
    console.log(decoded.userId);
    res.status(201).end();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
});

module.exports = router;
