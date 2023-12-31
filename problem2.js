// problems/problem2.js
const ExceptionHandler = require("./ExceptionHandler");

async function fetchDataFromApi(apiUrl) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const error = new Error(`HTTP error! Status: ${response.status}`);
      error.response = response;
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errorResponse = ExceptionHandler(error);
    console.error(
      `Error ${errorResponse.statusCode}: ${errorResponse.message}`
    );
    throw errorResponse;
  }
}

module.exports = fetchDataFromApi;
