const express = require("express");
const router = express.Router();

const {
  getCartById,
  getCarts,
  createCart,
  createOrUpdateCart,
} = require("../controller/shoppingCart.controller");

const { validateObjectId } = require("../middleware/validateObjectId");
const {
  validateUpdateShoppingCart,
} = require("../validation/shoppingCart.validate");

router.get("/:id", validateObjectId, getCartById);

// router.get("/", getCarts);

router.post("/", createCart);

router.put(
  "/:id",
  validateObjectId,
  validateUpdateShoppingCart,
  createOrUpdateCart
);

// router.delete("/:id", validateObjectId, auth, deleteProduct);

module.exports = router;
