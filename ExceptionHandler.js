function ExceptionHandler(error) {
  console.log(
    "🚀 ~ file: ExceptionHandler.js:5 ~ ExceptionHandler ~ error:",
    error
  );

  const handleAuthError = () => {
    return {
      statusCode: 401,
      message: "Your session has expired",
    };
  };

  const handleStatusCodeError = (status, msg) => {
    switch (status) {
      case 401:
        return handleAuthError();
      case 403:
        return {
          statusCode: 403,
          message: msg || "Forbidden",
        };
      case 404:
        return {
          statusCode: 404,
          message: msg || "API Not Found",
        };
      case 405:
        return {
          statusCode: 405,
          message: msg || "Method Not Allowed",
        };
      case 406:
        return {
          statusCode: 406,
          message: msg || "Already Exists",
        };
      case 413:
        return {
          statusCode: 413,
          message: msg || "Payload Too Large",
        };
      case 422:
        return {
          statusCode: 422,
          message: msg || "Unprocessable Entity",
        };
      case 430:
        return {
          statusCode: 430,
          message:
            msg || (error.response.data ? error.response.data : "Invalid Data"),
        };
      case 444:
        return {
          statusCode: 444,
          message: msg || "Connection Closed Without Response",
        };
      case 500:
        return {
          statusCode: 500,
          message: msg || "Internal Server Error",
        };
      case 503:
        return {
          statusCode: 503,
          message: msg || "Service Unavailable",
        };
      default:
        return {
          statusCode: 500,
          message: msg || "Unknown Error",
        };
    }
  };

  if (error.name === "TokenExpiredError") {
    return handleAuthError();
  } else if (error.response) {
    const {
      msg,
      name: [name],
    } = error.response.data || {};
    const status = error.response.status;

    return handleStatusCodeError(status, msg || name);
  } else if (error.request) {
    return {
      statusCode: 500,
      message: "No response received from the server",
    };
  } else {
    return {
      statusCode: 500,
      message: "No Internet Connection",
    };
  }
}

module.exports = ExceptionHandler;
