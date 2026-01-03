const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");
const { validateReportRequest } = require("../validators/report.validator");

router.get(
  "/:id/download-report",
  validateReportRequest,
  storeController.generateReport
);

module.exports = router;
