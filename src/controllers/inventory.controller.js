class InventoryController {
  uploadInventory(req, res, next) {
    if (!req.file) {
      return next(ApiError.badRequest("Please upload a CSV file"));
    }

    const results = [];

    fs.createReadStream(req.file.path)

      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          // Use a transaction for safety (optional but recommended)
          await sequelize.transaction(async (t) => {
            for (const row of results) {
              await processRow(row);
            }
          });

          // Cleanup temp file
          fs.unlinkSync(req.file.path);

          res.status(200).json({
            message: "Inventory processed successfully",
            count: results.length
          });
        } catch (error) {
          console.error(error);
          next(error);
        }
      });
  }
}

module.exports = new InventoryController();
