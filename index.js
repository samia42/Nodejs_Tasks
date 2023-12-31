// index.js
const express = require("express");
const downloadContents = require("./problem1");
const fetchDataFromApi = require("./problem2");
const listFilesWithExtension = require("./problem3");
const problem4App = require("./problem4");
const problem5App = require("./problem5");

const app = express();
const PORT = 9000;

// Example routes for calling the problems
app.get("/problem1", async (req, res) => {
  try {
    const urls = ["url1", "url2", "url3"]; // Replace with actual URLs
    const results = await downloadContents(urls);
    res.json(results);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

app.get("/problem2", async (req, res) => {
  try {
    const apiUrl = "https://jsonplaceholder.typicode.com/todos/1"; // Replace with actual API URL
    const data = await fetchDataFromApi(apiUrl);
    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

app.get("/problem3", async (req, res) => {
  try {
    const directoryPath = "./"; // Replace with actual directory path
    const fileExtension = ".txt"; // Replace with the desired file extension
    const files = listFilesWithExtension(directoryPath, fileExtension);
    res.json(files);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

// Mount the app for Problem 4 under the /problem4 route
app.use("/problem4", problem4App);

// Mount the app for Problem 5 under the /problem5 route
app.use("/problem5", problem5App);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
