const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define Models
const Store = sequelize.define("Store", {
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  logo: { type: DataTypes.STRING } // URL or path
});

const Author = sequelize.define("Author", {
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
});

const Book = sequelize.define("Book", {
  name: { type: DataTypes.STRING, allowNull: false },
  pages: { type: DataTypes.INTEGER }
});

const StoreBook = sequelize.define("StoreBook", {
  price: { type: DataTypes.FLOAT, allowNull: false },
  copies: { type: DataTypes.INTEGER, defaultValue: 1 },
  sold_out: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// Define Relationships
Author.hasMany(Book);
Book.belongsTo(Author);

// Many-to-Many between Store and Book
Store.belongsToMany(Book, { through: StoreBook });
Book.belongsToMany(Store, { through: StoreBook });

// Necessary for querying the junction table directly later
Store.hasMany(StoreBook);
StoreBook.belongsTo(Store);
Book.hasMany(StoreBook);
StoreBook.belongsTo(Book);

module.exports = { Store, Author, Book, StoreBook };
