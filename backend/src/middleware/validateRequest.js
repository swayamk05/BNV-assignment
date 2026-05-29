const { validationResult } = require("express-validator");
const { ApiError } = require("../utils/apiError");

const validateRequest = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array().map((error) => error.msg);
    return next(new ApiError(400, "Validation failed", errors));
  }

  return next();
};

module.exports = validateRequest;
