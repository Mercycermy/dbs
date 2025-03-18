import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import "./CreatePost.css";

const API_URL = "http://localhost:3001";

function CreatePost({ token }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in to create or edit a post.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
  
    // Debugging: Log FormData
    console.log("FormData:", {
      title: formData.get("title"),
      content: formData.get("content"),
      image: formData.get("image"),
    });
  
    try {
      if (editingPostId) {
        // Use PATCH for updating an existing post
        await axios.patch(`${API_URL}/posts/${editingPostId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ensure this header is set
          },
        });
        setEditingPostId(null); // Reset editing state
      } else {
        // Use POST for creating a new post
        await axios.post(`${API_URL}/posts`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ensure this header is set
          },
        });
      }
      setTitle(""); // Clear the form fields
      setContent("");
      setImage(null);
      fetchPosts(); // Refresh the list of posts
    } catch (error) {
      console.error("Error creating/updating post:", error);
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${API_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts(); // Refresh the list of posts after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setImage(postToEdit.image);
      setEditingPostId(postId); // Set the post ID being edited
    }
  };

  return (
    <div className="create-post-container">
      <h2>{editingPostId ? "Edit Post" : "Create a New Post"}</h2>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className="textarea-field"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            className="file-input"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-button">
          {editingPostId ? "Update Post" : "Create Post"}
        </button>
      </form>

      {/* Display all posts */}
      <div className="posts-list">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-item">
            {post.image && <img src={`${API_URL}${post.image}`} alt={post.title} />}
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <div className="post-actions">
              <button onClick={() => handleEditPost(post.id)} className="edit-btn">
                <Edit size={18} /> {/* Edit Icon */}
              </button>
              <button onClick={() => handleDeletePost(post.id)} className="delete-btn">
                <Trash2 size={18} /> {/* Delete Icon */}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default CreatePost;