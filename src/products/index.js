const express = require("express");

const { ProductsController } = require("./controller");

const router = express.Router();

module.exports.ProductsAPI = (app) => {
  router
    .get("/", ProductsController.getProducts) //http://localhost:3000/api/products/
    .get("/report", ProductsController.generateReport)
    .get("/:id", ProductsController.getProduct) //http://localhost:3000/api/products/23
    .post("/", ProductsController.createProduct)
    .put("/:id", ProductsController.updateProduct) // http://localhost:3000/api/products/:id
    .delete("/:id", ProductsController.deleteProduct); // http://localhost:3000/api/products/:id
  
  app.use("/api/products", router);
};
