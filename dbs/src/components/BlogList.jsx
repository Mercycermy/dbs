import React, { useEffect, useState } from "react";
import axios from "axios";
import imagehero from "../assets/images/hero.jpg";
import "./Blog.css";

const API_URL = "http://localhost:3001";

function BlogList({ onSelectPost }) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    axios
      .get(`${API_URL}/posts`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

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
              {post.image && <img src={`${API_URL}${post.image}`} alt={post.title} className="blog-image" />}
              <h3  className="blog-title">{post.title}</h3>
              <p className="blog-content">{post.content.substring(0, 150)}...</p>
              <a onClick={() => onSelectPost(post)}  className="read-more">Read More</a>
              <div className="blog-meta">
                <small>By {post.author} | {post.timeSince} ago</small>
                <span className="like-count">❤️ {post.likes}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>&lt;</button>
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
        <h2>Subscribe To Our Newsletter</h2>
        <p>Get weekly fresh news, articles, and updates delivered to your inbox.</p>
        <input type="email" placeholder="Email" className="newsletter-input" />
        <button className="newsletter-button">Sign Up</button>
      </div>
    </div>
  );
}

export default BlogList;