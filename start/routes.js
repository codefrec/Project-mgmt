const error = require("../middleware/error");
const express = require("express");
const cors = require("cors");

const product = require("../routes/product.routes");
const shoppingCart = require("../routes/shoppingCart.routes");

module.exports = function (app) {
  var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
  app.use(express.static("public/"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API;
  app.use("/api/v1/products", product);
  app.use("/api/v1/shopping-carts/", shoppingCart);

  app.use(error);
};
