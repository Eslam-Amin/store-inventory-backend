const Joi = require("joi");
const { validateRequest } = require("../utils/validation");

// 1. Validation for Report Download (ID must be a number)
const reportSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Store ID must be a number",
    "any.required": "Store ID is required"
  })
});

module.exports = {
  validateReportRequest: validateRequest(reportSchema, "params")
};
