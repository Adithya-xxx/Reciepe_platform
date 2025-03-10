import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/recipes`)
      .then(response => setRecipes(response.data))
      .catch(error => console.error("Error fetching recipes:", error));

    // Ensure userId is fetched properly
    setUserId(localStorage.getItem("userId"));
  }, []);

  const handleSaveRecipe = async (recipeId) => {
    if (!userId) {
      alert("You must be logged in to save recipes.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/recipes/save`, { recipeId, userId });
      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Failed to save recipe.");
    }
  };

  return (
    <div>
      <h2>All Recipes</h2>
      <div>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} style={{ width: "150px", height: "100px" }} />}
              
              {/* Show "Save Recipe" button only if user is logged in */}
              {userId && <button onClick={() => handleSaveRecipe(recipe._id)}>Save Recipe</button>}
            </div>
          ))
        ) : (
          <p>No recipes available.</p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
