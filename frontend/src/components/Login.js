// Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });
      if (res.status === 200) {
        const userData = res.data;
        onLogin(userData);
        navigate("/");
      } else {
        throw new Error("Unable to log in");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group1">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group1">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group1">
          <button type="submit">Login</button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
      <div>
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Login;
