import React, { useState } from "react";
import axios from "axios";

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
      alert("Login failed!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <p>
  Don't have an account?{" "}
  <span className="link-text" onClick={toggleForm}>
    Register here
  </span>
</p>
    </div>
  );
}

export default Login;
