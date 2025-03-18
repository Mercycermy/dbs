import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from "./Form";
import "./BlogDetail.css";

const API_URL = "http://localhost:3001";

function BlogDetail() {
  const { id } = useParams(); // Extract the post ID from the URL
  const [post, setPost] = useState(null); // State to store the fetched post
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch the post data when the component mounts or the ID changes
  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with ID:", id); // Debugging log
        const response = await axios.get(`${API_URL}/posts/${id}`);
        console.log("Post data:", response.data); // Debugging log
        setPost(response.data); // Set the fetched post data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to fetch post. Please try again later."); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchPost(); // Call the fetch function
  }, [id]); // Re-fetch when the ID changes

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>{error}</div>;
  }

  // Display the post data
  return (
    <div className="blog-detail">
      <h2 className="blogtitle">{post.title}</h2>
      <div className="blogmeta">
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
<div className="blogdetail">
  
      {post.image && (
        <img src={`${API_URL}${post.image}`} alt={post.title} className="blogimage" />
      )}

      <p className="blogcontent">{post.content}</p>
</div>
      <Form />
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

export default BlogDetail;