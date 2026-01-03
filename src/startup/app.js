const path = require("path");
const cors = require("cors");
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const hpp = require("hpp");
const globalErrorMiddleware = require("../middlewares/globalError.middleware");
const appRouter = require("./routes");

module.exports = (app) => {
  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());
  app.use(compression());
  app.use(helmet());
  //Prevent parameter pollution
  app.use(hpp());

  app.use(express.static(path.join(__dirname, "uploads")));

  app.use("/api", appRouter);

  // Global Error Handler
  app.use(globalErrorMiddleware);
};
