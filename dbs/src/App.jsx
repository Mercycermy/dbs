import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import CreatePost from "./components/CreatePost";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLogin, setIsLogin] = useState(true); // State to switch between login and register
  const [selectedPage, setSelectedPage] = useState("blogList"); // Track current page

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setSelectedPage("login"); // Redirect to login after logging out
  };

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <h1>Blog App</h1>
        <nav>
          {!token ? (
            isLogin ? (
              <button className="header-link" onClick={() => setIsLogin(false)}>
                Sign Up
              </button>
            ) : (
              <button className="header-link" onClick={() => setIsLogin(true)}>
                Sign In
              </button>
            )
          ) : (
            <>
              <button
                className="header-link"
                onClick={() => setSelectedPage("createPost")}
              >
                Create Post
              </button>
              <button
                className="header-link"
                onClick={() => setSelectedPage("blogList")}
              >
                Blog List
              </button>
              <button className="header-link" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Content Section */}
      <div className="container">
        {!token ? (
          isLogin ? (
            <Login setToken={setToken} toggleForm={() => setIsLogin(false)} />
          ) : (
            <Register toggleForm={() => setIsLogin(true)} />
          )
        ) : (
          <div>
            {selectedPage === "blogList" && (
              <BlogList
                token={token}
                onSelectPost={(post) => setSelectedPage(post)}
              />
            )}
            {selectedPage === "createPost" && (
              <CreatePost
                token={token}
                onPostCreated={() => setSelectedPage("blogList")}
              />
            )}
            {selectedPage !== "blogList" && selectedPage !== "createPost" && (
              <BlogDetail
                post={selectedPage}
                onBack={() => setSelectedPage("blogList")}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
