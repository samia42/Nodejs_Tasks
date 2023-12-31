// problems/problem1.js
const ExceptionHandler = require("./ExceptionHandler");

async function downloadContents(urls) {
  try {
    // Implement asynchronous download logic for each URL
    const results = await Promise.all(
      urls.map(async (url) => {
        // Simulate asynchronous download
        const response = await fetch(url);
        return response.text();
      })
    );

    return results;
  } catch (error) {
    const errorResponse = ExceptionHandler(error);
    console.error(
      `Error ${errorResponse.statusCode}: ${errorResponse.message}`
    );
    throw errorResponse;
  }
}

module.exports = downloadContents;
