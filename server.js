const express = require("express");
const { initDb } = require("./src/startup/db-connect");
const { env } = require("./src/config/env");

// Express app
const app = express();

const server = require("http").createServer(app);
const PORT = env.port || 8000;

require("./src/startup/app")(app);

// Initialize DB and Start Server
initDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
