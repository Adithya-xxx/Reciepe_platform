import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const API_BASE_URL = "http://localhost:3000";

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });

            // Store username & userId in localStorage
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("userId", res.data.userId);  // ✅ Ensure userId is stored

            console.log("Stored userId:", res.data.userId);  // ✅ Debugging log

            setIsLoggedIn(true);
            navigate("/home");
        } catch (error) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p>New user? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default Login;
