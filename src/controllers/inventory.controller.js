const fs = require("fs");
const csv = require("csv-parser");
const sequelize = require("../config/database");
const ApiError = require("../utils/ApiError");
const { Store, Book, Author, StoreBook } = require("../models");

// --- Helper: Process a single CSV Row ---
const processRow = async (row) => {
  const {
    store_name,
    store_address,
    book_name,
    pages,
    author_name,
    price,
    logo
  } = row;

  // 1. Find or Create Author
  const [author] = await Author.findOrCreate({
    where: { name: author_name }
  });

  // 2. Find or Create Book (linked to Author)
  const [book] = await Book.findOrCreate({
    where: { name: book_name },
    defaults: { pages, AuthorId: author.id }
  });

  // 3. Find or Create Store
  const [store] = await Store.findOrCreate({
    where: { name: store_name },
    defaults: { address: store_address, logo: logo }
  });

  // 4. Update Inventory (StoreBook)
  const inventoryItem = await StoreBook.findOne({
    where: { StoreId: store.id, BookId: book.id }
  });

  if (inventoryItem) {
    // Update: increment copies, update price
    inventoryItem.copies += 1;
    inventoryItem.price = price; // Update to latest price
    inventoryItem.sold_out = false;
    await inventoryItem.save();
  } else {
    // Create new inventory record
    await StoreBook.create({
      StoreId: store.id,
      BookId: book.id,
      price: price,
      copies: 1
    });
  }
};

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
