const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();  // Ensure environment variables load

const app = express();  // ✅ Initialize `app` before using it

// Middleware
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("<h1 align=center>Welcome to the Recipe Sharing API</h1>");
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
