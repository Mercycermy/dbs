import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Blog from "./components/Blog";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLogin, setIsLogin] = useState(true); // State to switch between login and register

  return (
    <div>
      <h1>Blog App</h1>
      {!token ? (
        isLogin ? (
          <Login setToken={setToken} toggleForm={() => setIsLogin(false)} />
        ) : (
          <Register toggleForm={() => setIsLogin(true)} />
        )
      ) : (
        <Blog token={token} />
      )}
    </div>
  );
}

export default App;