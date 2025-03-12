import React from "react";
import axios from "axios";
 import './BlogDetail.css';

const API_URL = "http://localhost:3001";

function BlogDetail({ post, onBack }) {
  const handleLike = async () => {
    try {
      await axios.post(`${API_URL}/posts/${post.id}/like`);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="blog-detail">
      <button className="back-button" onClick={onBack}>Back to Blog List</button>
      
      <h2 className="blog-title">{post.title}</h2>
      <div className="blog-meta">
        <img src="/default-avatar.png" alt="Author" className="author-avatar" />
        <small>By {post.author}</small>
      </div>

      <img src={post.image || "/default-image.jpg"} alt="Blog Cover" className="blog-image" />
      
      <p className="blog-content">{post.content}</p>

      <button className="like-button" onClick={handleLike}>Like</button>

      {/* Author Box */}
      <div className="author-box">
        <img src="/default-avatar.png" alt="Author" className="author-avatar-lg" />
        <div>
          <strong>{post.author}</strong>
          <p>Author bio goes here...</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments</h3>
        <div className="comment-form">
          <input type="text" className="comment-input" placeholder="Add a comment..." />
          <button className="comment-submit">Post</button>
        </div>
        <div className="comments-list">
          <div className="comment">
            <strong>User1:</strong> This is a sample comment.
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter">
        <h3>Subscribe to Our Newsletter</h3>
        <input type="email" className="comment-input" placeholder="Your email" />
        <button className="comment-submit">Subscribe</button>
      </div>
    </div>
  );
}

export default BlogDetail;