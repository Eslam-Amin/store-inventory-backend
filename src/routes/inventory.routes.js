const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer setup for temporary file storage
const upload = multer({ dest: "uploads/" });

const inventoryController = require("../controllers/inventory.controller");
const { validateFileUpload } = require("../validators/fileUpload.validator");

router.post(
  "/upload",
  upload.single("file"),
  validateFileUpload,
  inventoryController.uploadInventory
);

module.exports = router;
