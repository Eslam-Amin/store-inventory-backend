const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const env = Object.freeze({
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || "postgres",
  dbPass: process.env.DB_PASS || "password",
  dbName: process.env.DB_NAME || "bookstore",
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: process.env.DB_PORT || 5432,

  nodeEnv: process.env.NODE_ENV
});

module.exports = { env };
