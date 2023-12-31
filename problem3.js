// problems/problem3.js
const fs = require("fs");
const path = require("path");

function listFilesWithExtension(directoryPath, fileExtension) {
  try {
    const files = fs.readdirSync(directoryPath);
    const filteredFiles = files.filter(
      (file) => path.extname(file) === fileExtension
    );
    return filteredFiles;
  } catch (error) {
    const errorResponse = ExceptionHandler(error);
    console.error(
      `Error ${errorResponse.statusCode}: ${errorResponse.message}`
    );
    throw errorResponse;
  }
}

module.exports = listFilesWithExtension;
