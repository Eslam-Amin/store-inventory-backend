const Joi = require("joi");
const ApiError = require("./ApiError");

// Helper function to run Joi validation
const validateRequest = (schema, property = "body") => {
  return (req, res, next) => {
    // If validating a file, we check req.file, otherwise req[property]
    const dataToValidate = property === "file" ? req.file : req[property];

    // Special handling for file validation because req.file is not a standard object
    if (property === "file") {
      if (!dataToValidate)
        return next(ApiError.badRequest("Please upload a CSV file"));

      // If file exists, we consider it valid for now (Multer handles the binary part)
      // You can expand this to check mime-types if needed
      return next();
    }

    const { error } = schema.validate(dataToValidate);

    if (error) {
      const err = new Error(error.details[0].message);
      return next(ApiError.badRequest(err.message));
    }

    next();
  };
};

module.exports = {
  validateRequest
};
