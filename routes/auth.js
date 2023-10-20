// const passport = require('passport');
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed. User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed. Incorrect password." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Authentication successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hash });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;