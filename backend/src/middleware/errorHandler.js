const { ApiError } = require("../utils/apiError");
const { sendError } = require("../utils/apiResponse");

const notFound = (req, res, next) => {
  next(new ApiError(404, "Route not found"));
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server error";
  let errors = err.errors || [];

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((error) => error.message);
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
    errors = [`Invalid ${err.path}`];
  }

  sendError(res, { statusCode, message, errors });
};

module.exports = { notFound, errorHandler };
