const express = require("express");
const Recipe = require("../models/Recipe");
const User = require("../models/User");

const router = express.Router();

// Create Recipe (Logged-in users only)
router.post("/", async (req, res) => {
    const { title, description, imageUrl, userId } = req.body;

    try {
        console.log("🔹 Creating recipe for user:", userId);
        console.log("🔹 Recipe details:", { title, description, imageUrl });

        if (!title || !description || !userId) {
            console.log("❌ Missing required fields");
            return res.status(400).json({ error: "Title, description, and userId are required" });
        }

        const recipe = new Recipe({ title, description, imageUrl, createdBy: userId });
        await recipe.save();

        console.log("✅ Recipe created successfully:", recipe);
        res.json(recipe);
    } catch (error) {
        console.error("❌ Recipe Creation Error:", error);
        res.status(500).json({ error: "Failed to create recipe" });
    }
});


// Get All Recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find().populate("createdBy", "username");
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});

// Save Recipe to User Account
router.post("/save", async (req, res) => {
    const { recipeId, userId } = req.body;

    try {
        await User.findByIdAndUpdate(userId, { $push: { savedRecipes: recipeId } });
        res.json({ message: "Recipe saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save recipe" });
    }
});

// Get Saved Recipes for a User
router.get("/saved", async (req, res) => {
    const { userId } = req.query;

    try {
        const user = await User.findById(userId).populate("savedRecipes");
        res.json(user.savedRecipes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch saved recipes" });
    }
});

module.exports = router;
