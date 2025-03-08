const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
});

module.exports = mongoose.model("User", UserSchema);
