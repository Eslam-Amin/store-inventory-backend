const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");

router.get("/:id/download-report", storeController.generateReport);

module.exports = router;
