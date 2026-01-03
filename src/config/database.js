const { Sequelize } = require("sequelize");
const { env } = require("./env");

const sequelize = new Sequelize(
  env.dbName || "bookstore",
  env.dbUser || "postgres",
  env.dbPass || "password",
  {
    host: env.dbHost || "localhost",
    dialect: "postgres",
    logging: false // Set to console.log to see SQL queries
  }
);

module.exports = sequelize;
