import React, { useState } from "react";
import axios from "axios";
import "./CreatePost.css";

const API_URL = "http://localhost:3001";

function CreatePost({ token, onPostCreated }) {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
  });

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    formData.append("author", newPost.author);
    formData.append("image", newPost.image);

    try {
      await axios.post(`${API_URL}/posts`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      setNewPost({ title: "", content: "", author: "", image: null });
      onPostCreated(); // Refresh post list after creation
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handlePostSubmit} className="create-post-form">
        {/* Title */}
        <input
          type="text"
          placeholder="Enter post title..."
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
          className="input-field"
        />

        {/* Content */}
        <textarea
          placeholder="Write your post content here..."
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          required
          className="textarea-field"
        />

        {/* Author */}
        <input
          type="text"
          placeholder="Author name"
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
          required
          className="input-field"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewPost({ ...newPost, image: e.target.files[0] })}
          className="file-input"
        />

        {/* Submit Button */}
        <button type="submit" className="submit-button">Publish Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
