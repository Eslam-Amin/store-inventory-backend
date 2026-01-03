const sequelize = require("../config/database");

const initDb = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully.");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
};

module.exports = { initDb };
