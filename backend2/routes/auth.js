const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.json({ message: "User Registered" });
    } catch (err) {
        res.status(400).json({ error: "Username or Email already exists" });
    }
});

// Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("🔹 Login attempt for:", email);

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(400).json({ error: "User not found" });
        }

        console.log("✅ User found:", user.username);

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Incorrect password for:", email);
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        console.log("✅ Password matched. Generating token...");

        // Generate JWT Token
        if (!process.env.JWT_SECRET) {
            console.log("❌ JWT_SECRET is missing in .env file");
            return res.status(500).json({ error: "Server misconfiguration" });
        }

        const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("🔹 Token generated:", token);
        console.log("✅ Returning userId and username to frontend");

        // Send token + userId + username
        res.json({
            token,
            userId: user._id.toString(), // ✅ Send userId in response
            username: user.username
        });

    } catch (err) {
        console.error("❌ Login Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;
