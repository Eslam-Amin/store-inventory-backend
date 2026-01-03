const storeRoutes = require("../routes/store.routes");
const inventoryRoutes = require("../routes/inventory.routes");
const ApiError = require("../utils/ApiError");

const appRouter = require("express").Router();

appRouter.use("/stores", storeRoutes);
appRouter.use("/inventory", inventoryRoutes);

// Not Found Route
appRouter.all("*", (req, res, next) => {
  console.log("No matching route for:", req.url); // Add logging
  next(ApiError.notFound("Route not found"));
});

module.exports = appRouter;
