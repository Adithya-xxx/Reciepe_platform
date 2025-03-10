import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios.get(`${API_BASE_URL}/api/recipes/saved?userId=${userId}`)
        .then(response => setSavedRecipes(response.data))
        .catch(error => console.error("Error fetching saved recipes:", error));
    }
  }, [userId]);

  return (
    <div>
      <h2>Saved Recipes</h2>
      <div>
        {savedRecipes.length > 0 ? (
          savedRecipes.map((recipe) => (
            <div key={recipe._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} style={{ width: "150px", height: "100px" }} />}
            </div>
          ))
        ) : (
          <p>No saved recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
