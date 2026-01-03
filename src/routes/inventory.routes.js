const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer setup for temporary file storage
const upload = multer({ dest: "uploads/" });

const inventoryController = require("../controllers/inventory.controller");

router.post(
  "/inventory/upload",
  upload.single("file"),
  inventoryController.uploadInventory
);

module.exports = router;
