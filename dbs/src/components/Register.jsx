import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001";

function Register({ toggleForm }) {
  const [registerData, setRegisterData] = useState({ username: "", password: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, registerData);
      alert("Registration Successful! You can now log in.");
      toggleForm(); // Switch to login after registration
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
      <p>
  Already have an account?{" "}
  <span className="link-text" onClick={toggleForm}>
    Login here
  </span>
</p>

    </div>
  );
}

export default Register;
