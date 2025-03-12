import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const API_URL = "http://localhost:3001";

function Register({ toggleForm }) {
  const [registerData, setRegisterData] = useState({ username: "", password: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, registerData);
      alert("Registration Successful! You can now log in.");
      toggleForm();
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign up</h2>
        <form onSubmit={handleRegister}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            required
          />
          <button type="submit">Sign up</button>
        </form>
        <p>
          Already have an account?{" "}
          <span className="link-text" onClick={toggleForm}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
