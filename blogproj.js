import express from "express";
import db from "./dbs.js"; // Ensure correct path
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const PORT = process.env.PORT || 3001;
const SECRET_KEY = "your_secret_key"; // Replace with your secret key

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

// Admin login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send("Error querying the database");
    if (results.length === 0) return res.status(401).send("Invalid username or password");

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send("Error comparing passwords");
      if (!isMatch) return res.status(401).send("Invalid username or password");

      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
      res.status(200).json({ token });
    });
  });
});

// Server Setup
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
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
app.patch("/posts/:id", upload.single("image"), (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  const { title, content } = req.body; // Extract title and content from the request body
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Handle the uploaded image

  // Prepare the updates
  const updates = {};
  if (title) updates.title = title;
  if (content) updates.content = content;
  if (image) updates.image = image;

  const fields = Object.keys(updates).map(key => `${key} = ?`).join(", ");
  const values = Object.values(updates);

  if (fields.length === 0) return res.status(400).send("No fields to update");

  const query = `UPDATE posts SET ${fields} WHERE id = ?`;
  db.query(query, [...values, id], (err, results) => {
    if (err) {
      console.error("Error updating blog post:", err);
      return res.status(500).send("Error updating blog post");
    }
    if (results.affectedRows === 0) return res.status(404).send("Post not found");
    res.status(200).send("Patch Updated Successfully");
  });
});
// Update a post with PUT
app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send("Title and content are required");

  const query = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
  db.query(query, [title, content, id], (err, results) => {
    if (err) {
      console.error("Error updating blog post:", err);
      return res.status(500).send("Error updating blog post");
    }
    if (results.affectedRows === 0) return res.status(404).send("Post not found");
    res.status(200).send("Post updated successfully");
  });
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  const query = "DELETE FROM posts WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting blog post:", err);
      return res.status(500).send("Error deleting blog post");
    }
    if (results.affectedRows === 0) return res.status(404).send("Post not found");
    res.status(200).send("Deleted Successfully!");
  });
});
