import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imagehero from "../assets/images/hero.jpg";
import "./Blog.css";
import { formatDistanceToNow } from "date-fns";
import '@fortawesome/fontawesome-free/css/all.min.css';




const API_URL = "http://localhost:3001";
// Format the date

function Blog({ token, setToken }) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/posts`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // Filter posts based on the search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate the current posts to display based on pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleReadMoreClick = (postId) => {
    navigate(`/blogdetail/${postId}`);
  };

  return (
    <div>
      <div className="Blog-Hero">
        <img src={imagehero} alt="Blog Hero" />
      </div>
      <h1 className="hero-title">Blog</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search in the website"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="blog-container">
        {currentPosts.length === 0 ? (
          <p className="no-posts">No posts available.</p>
        ) : (
          currentPosts.map((post) => (
            <div key={post.id} className="blog-post">
              {post.image && (
                <img
                  src={`${API_URL}${post.image}`}
                  alt={post.title}
                  className="blog-images"
                />
              )}
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-content">{post.content.substring(0, 150)}...</p>
              <a onClick={() => handleReadMoreClick(post.id)} className="read-more">
                Read More
              </a>
              <div className="blog-meta">
  {post.author_image && (
    <img src={post.author_image} alt="Author" className="author-avatar" />
  )}
  <small>
    By {post.author} |{" "}
    {post.created_at
      ? `${new Date(post.created_at).toLocaleDateString()} ${new Date(
          post.created_at
        ).toLocaleTimeString()}`
      : "No date available"}
  </small>
</div>

            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          &lt;
        </button>
        <span className="pagination-page">{currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(filteredPosts.length / postsPerPage) ? prev + 1 : prev
            )
          }
        >
          &gt;
        </button>
      </div>

      <div className="newsletter">
  <h2>Subscribe to newsletter</h2>
  <input type="email" placeholder="Enter your email" className="newsletter-input" />
  <button className="newsletter-button">SUBSCRIBE</button>
</div>

<footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <h2>About TechBlog</h2>
          <p>
            TechBlog is your go-to platform for the latest in technology,
            programming tutorials, AI innovations, and industry trends. Stay
            ahead with expert insights and coding guides.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Write for Us</a></li>
            <li><a href="#">Subscribe</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section links">
          <h2>Categories</h2>
          <ul>
            <li><a href="#">AI & Machine Learning</a></li>
            <li><a href="#">Web Development</a></li>
            <li><a href="#">Cybersecurity</a></li>
            <li><a href="#">Gadgets & Reviews</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} TechBlog | Built with{" "}
          <span className="heart">❤️</span> for tech enthusiasts
        </p>
      </div>
    </footer>

    </div>
  );
}

export default Blog;