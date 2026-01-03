const { validateRequest } = require("../utils/validation");

module.exports = {
  validateFileUpload: validateRequest(null, "file") // Simple presence check
};
