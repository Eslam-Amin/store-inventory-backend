const { env } = require("../config/env");

const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  // If the error already has a status, use it.
  // Otherwise, default to 500 (Internal Server Error).
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      stack: env.nodeEnv === "production" ? null : err.stack
    }
  });
};

module.exports = errorHandler;
