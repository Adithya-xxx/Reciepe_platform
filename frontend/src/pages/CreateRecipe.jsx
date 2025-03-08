import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({ title: "", description: "", imageUrl: "", ingredients: [] });
  const [ingredient, setIngredient] = useState(""); // Single ingredient input
  const [userId, setUserId] = useState(null);

  // Ensure userId is fetched properly
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] });
      setIngredient("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/recipes`, {
        ...recipe,
        userId
      });

      if (response.status === 200) {
        alert("Recipe added successfully!");
        setRecipe({ title: "", description: "", imageUrl: "", ingredients: [] });
      }
    } catch (error) {
      alert("Failed to add recipe");
    }
  };

  return (
    <div>
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Recipe Title" value={recipe.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Recipe Description" value={recipe.description} onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image URL (Optional)" value={recipe.imageUrl} onChange={handleChange} />
        
        {/* Ingredients Section */}
        <div>
          <input type="text" placeholder="Add an Ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
          <button type="button" onClick={handleAddIngredient}>Add</button>
        </div>
        
        <ul>
          {recipe.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>

        <button type="submit">Post Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;

