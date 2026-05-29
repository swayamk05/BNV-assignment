const sendSuccess = (res, { statusCode = 200, message, data = null, pagination = null }) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination
  });
};

const sendError = (res, { statusCode = 500, message, errors = [] }) => {
  res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

module.exports = { sendSuccess, sendError };
