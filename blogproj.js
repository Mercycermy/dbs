import express from "express";
import db from "./dbs.js"; // Ensure correct path
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const PORT = process.env.PORT || 3001;
const SECRET_KEY = "your_secret_key";

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access Denied");

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Invalid Token");
    req.user = user;
    next();
  });
};

// Server Setup
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

// Register User
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, hashedPassword], (err, results) => {
    if (err) return res.status(500).send("Error registering user");
    res.status(201).send("User registered");
  });
});

// Login User
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err || results.length === 0) return res.status(400).send("Invalid credentials");
    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid credentials");
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);
    res.status(200).json({ token });
  });
});

// Add a new post
app.post("/posts", upload.single("image"), (req, res) => {
  const { title, content, author } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const query = "INSERT INTO posts (title, content, author, image) VALUES (?, ?, ?, ?)";
  db.query(query, [title, content, author, image], (err, results) => {
    if (err) return res.status(500).send("Error creating blog post");
    res.status(201).send({ msg: "Blog Created", postId: results.insertId });
  });
});

// Get all posts
app.get("/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed", details: err });
    res.status(200).json(results);
  });
});

// Get a single post
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  const query = "SELECT * FROM posts WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send("Error fetching post");
    if (results.length === 0) return res.status(404).send("Post not found");
    res.status(200).json(results[0]);
  });
});

// Like a post
app.post("/posts/:id/like", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  const query = "UPDATE posts SET likes = likes + 1 WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send("Error liking post");
    if (results.affectedRows === 0) return res.status(404).send("Post not found");
    res.status(200).send("Post liked");
  });
});

// Update a post
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  const query = "UPDATE posts SET ? WHERE id = ?";
  db.query(query, [req.body, id], (err, results) => {
    if (err) return res.status(500).send("Error updating blog post");
    if (results.affectedRows === 0) return res.status(404).send("Post not found");
    res.status(200).send("Patch Updated Successfully");
  });
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  const query = "DELETE FROM posts WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send("Error deleting blog post");
    if (results.affectedRows === 0) return res.status(404).send("Post not found");
    res.status(200).send("Deleted Successfully!");
  });
});

// Add a new comment to a post
app.post("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;
  const query = "INSERT INTO comments (post_id, author, content) VALUES (?, ?, ?)";
  db.query(query, [id, author, content], (err, results) => {
    if (err) return res.status(500).send("Error adding comment");
    res.status(201).send({ msg: "Comment added", commentId: results.insertId });
  });
});

// Get comments for a post
app.get("/posts/:id/comments", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  const query = "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send("Error fetching comments");
    res.status(200).json(results);
  });
});
