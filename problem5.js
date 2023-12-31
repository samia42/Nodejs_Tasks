// problems/problem5.js
const express = require("express");
const jwt = require("jsonwebtoken");
const ExceptionHandler = require("./ExceptionHandler");

const app = express();
app.use(express.json());

const secretKey = "your-secret-key";

app.post("/login", (req, res) => {
  try {
    const user = { username: req.body.username };
    const token = jwt.sign(user, secretKey);
    res.json({ token });
  } catch (error) {
    const errorResponse = ExceptionHandler(error);
    console.error(
      `Error ${errorResponse.statusCode}: ${errorResponse.message}`
    );
    res.status(errorResponse.statusCode).json({ error: errorResponse.message });
  }
});

module.exports = app;
