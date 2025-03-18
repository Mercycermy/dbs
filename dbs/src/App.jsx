import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Blog from "./components/Blog";
import CreatePost from "./components/CreatePost";
import BlogDetail from "./components/BlogDetail"; // Ensure BlogDetail is imported
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <div>
        <header className="header">
          <h1>Blog App</h1>
          <nav>
            {token ? (
              <button onClick={() => {
                setToken("");
                localStorage.removeItem("token");
              }}>
                Sign Out
              </button>
            ) : null}
          </nav>
        </header>

        <div className="container">
          <Routes>
            <Route path="/" element={<Blog token={token} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/blog" element={<Blog token={token} />} />
            <Route
              path="/createpost"
              element={
                <PrivateRoute token={token}>
                  <CreatePost token={token} />
                </PrivateRoute>
              }
            />
            <Route path="/blogdetail/:id" element={<BlogDetail />} /> {/* Ensure this route is defined */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;