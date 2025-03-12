import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const API_URL = "http://localhost:3001";

function Login({ setToken, toggleForm }) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, loginData);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert("Invalid login credentials!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          <button type="submit">Log in</button>
        </form>
        <p>
          Don't have an account?{" "}
          <span className="link-text" onClick={toggleForm}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
