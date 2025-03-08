import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001";

function Blog({ token }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", author: "" });

  useEffect(() => {
    axios.get(`${API_URL}/posts`).then((response) => setPosts(response.data));
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/posts`, newPost, {
      headers: { Authorization: token },
    });
    setNewPost({ title: "", content: "", author: "" });
  };

  return (
    <div className="container">
      <h2>Create a Post</h2>
      <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
        />
        <button type="submit">Post</button>
      </form>

      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>By {post.author}</small>
          <button onClick={() => axios.post(`${API_URL}/posts/${post.id}/like`)}>Like</button>
        </div>
      ))}
    </div>
  );
}

export default Blog;
