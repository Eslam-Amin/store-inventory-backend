const { Sequelize } = require("sequelize");
const { env } = require("./env");

const sequelize = new Sequelize(
  env.DB_NAME || "bookstore",
  env.DB_USER || "postgres",
  env.DB_PASS || "password",
  {
    host: env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false // Set to console.log to see SQL queries
  }
);

module.exports = sequelize;
