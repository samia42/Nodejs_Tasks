// problems/problem4.js
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ExceptionHandler = require("./ExceptionHandler");

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({ title: String, content: String })
);

const express = require("express");
const app = express();
app.use(bodyParser.json());
// Create a new post
app.post('/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    const errorResponse = ExceptionHandler(error);
    console.error(`Error ${errorResponse.statusCode}: ${errorResponse.message}`);
    res.status(errorResponse.statusCode).json({ error: errorResponse.message });
  }
});

// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    const errorResponse = ExceptionHandler(error);
    console.error(`Error ${errorResponse.statusCode}: ${errorResponse.message}`);
    res.status(errorResponse.statusCode).json({ error: errorResponse.message });
  }
});

// Get a specific post by ID
app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (error) {
    const errorResponse = ExceptionHandler(error);
    console.error(`Error ${errorResponse.statusCode}: ${errorResponse.message}`);
    res.status(errorResponse.statusCode).json({ error: errorResponse.message });
  }
});

// Update a post by ID
app.put('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });
    if (!updatedPost) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(updatedPost);
  } catch (error) {
    const errorResponse = ExceptionHandler(error);
    console.error(`Error ${errorResponse.statusCode}: ${errorResponse.message}`);
    res.status(errorResponse.statusCode).json({ error: errorResponse.message });
  }
});

// Delete a post by ID
app.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(deletedPost);
  } catch (error) {
    const errorResponse = ExceptionHandler(error);
    console.error(`Error ${errorResponse.statusCode}: ${errorResponse.message}`);
    res.status(errorResponse.statusCode).json({ error: errorResponse.message });
  }
});

module.exports = app;
