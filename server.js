const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming User model is defined in models/User.js

// POST /auth/register/:role - User registration
router.post("/register/:role", async (req, res) => {
  const { role } = req.params;
  const { fullName, email, password } = req.body;

  if (!["student", "teacher"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// POST /auth/login/:role - User login
router.post("/login/:role", async (req, res) => {
  const { role } = req.params;
  const { email, password } = req.body;

  if (!["student", "teacher"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "your_jwt_secret",
      { expiresIn: "1h" } // Token expiration time
    );
    res.json({ token, fullName: user.fullName, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
});

module.exports = router;
