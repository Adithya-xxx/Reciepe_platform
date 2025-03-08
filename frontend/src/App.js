import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import CreateRecipe from "./pages/CreateRecipe";
import SavedRecipes from './pages/SavedRecipes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Redirect to Login if not logged in */}
        <Route path="/" element={<Home /> } />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/home" element={ <Home /> } />
        <Route path="/recipes" element={<Recipes />} />

        {/* Restrict access to logged-in users only */}
        <Route path="/create" element={isLoggedIn ? <CreateRecipe /> : <Navigate to="/login" />} />
        <Route path="/saved" element={isLoggedIn ? <SavedRecipes /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
