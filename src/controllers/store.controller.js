const PDFDocument = require("pdfkit");
const { Store, Book, Author, StoreBook } = require("../models");
const ApiError = require("../utils/ApiError");

class StoreController {
  async generateReport(req, res, next) {
    const storeId = req.params.id;

    try {
      const store = await Store.findByPk(storeId);
      if (!store) return next(ApiError.notFound("Store not found"));

      // Query 1: Top 5 Priciest Books
      const topPriciest = await StoreBook.findAll({
        where: { StoreId: storeId },
        include: [{ model: Book, include: [Author] }],
        order: [["price", "DESC"]],
        limit: 5
      });

      // Query 2: Top 5 Authors by book count in this store
      // We fetch all books in this store, then group in JS or specialized SQL.
      // For Sequelize simplicity, we will query StoreBooks including Book->Author.
      const allStoreBooks = await StoreBook.findAll({
        where: { StoreId: storeId },
        include: [{ model: Book, include: [Author] }]
      });

      // Calculate Author stats in memory (easier than complex Sequelize GroupBy for this specific relation depth)
      const authorCounts = {};
      allStoreBooks.forEach((sb) => {
        const authorName = sb.Book.Author.name;
        authorCounts[authorName] = (authorCounts[authorName] || 0) + 1;
      });

      const sortedAuthors = Object.entries(authorCounts)
        .sort(([, a], [, b]) => b - a) // Sort by count DESC
        .slice(0, 5);

      // --- Generate PDF ---
      const doc = new PDFDocument();
      const filename = `${store.name.replace(/ /g, "_")}-Report-${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      res.setHeader(
        "Content-disposition",
        `attachment; filename="${filename}"`
      );
      res.setHeader("Content-type", "application/pdf");

      doc.pipe(res);

      // Header
      doc.fontSize(25).text(store.name, { align: "center" });
      doc.fontSize(12).text(`Report Date: ${new Date().toLocaleDateString()}`, {
        align: "center"
      });
      doc.moveDown();

      // Section 1
      doc.fontSize(18).text("Top 5 Priciest Books", { underline: true });
      doc.moveDown(0.5);
      topPriciest.forEach((item, index) => {
        doc
          .fontSize(12)
          .text(
            `${index + 1}. ${item.Book.name} - $${item.price} (by ${
              item.Book.Author.name
            })`
          );
      });
      doc.moveDown();

      // Section 2
      doc
        .fontSize(18)
        .text("Top 5 Prolific Authors (In Inventory)", { underline: true });
      doc.moveDown(0.5);
      sortedAuthors.forEach(([author, count], index) => {
        doc
          .fontSize(12)
          .text(`${index + 1}. ${author} - ${count} books available`);
      });

      doc.end();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = new StoreController();
