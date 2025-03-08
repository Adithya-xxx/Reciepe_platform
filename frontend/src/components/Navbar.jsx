import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  
  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear login info
    setIsLoggedIn(false); // Update state
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand text-white" to="/">QUICKDel</Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/recipes">Recipes</Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/create">Create Recipe</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/saved">Saved Recipes</Link>
                </li>
              </>
            )}
          </ul>

          {/* Show Login/Register if not logged in, else show Logout */}
          {!isLoggedIn ? (
            <div>
              <Link className="btn btn-success me-2" to="/login">Login</Link>
              <Link className="btn btn-info" to="/register">Register</Link>
            </div>
          ) : (
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
