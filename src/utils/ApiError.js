/**
 * API Error Class
 *
 * Custom error class for API responses with HTTP status codes.
 * All errors created with this class are marked as operational,
 * meaning they are expected errors that should be sent to the client.
 */
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.isOperational = true;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "Failed" : "Error";
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Create a 400 Bad Request Error
   * Used for validation errors, malformed requests, etc.
   */
  static badRequest(message = "Bad Request") {
    return new ApiError(message, 400);
  }

  /**
   * Create a 401 Unauthorized Error
   * Used when authentication is required or has failed.
   */
  static unauthorized(message = "Unauthorized") {
    return new ApiError(message, 401);
  }

  /**
   * Create a 403 Forbidden Error
   * Used when user is authenticated but doesn't have permission.
   */
  static forbidden(message = "Forbidden") {
    return new ApiError(message, 403);
  }

  /**
   * Create a 404 Not Found Error
   * Used when a requested resource is not found.
   */
  static notFound(message = "Not Found") {
    return new ApiError(message, 404);
  }

  /**
   * Create a 500 Internal Server Error
   * Used for unexpected server errors.
   */
  static internal(message) {
    return new ApiError(message, 500);
  }
}

module.exports = ApiError;
