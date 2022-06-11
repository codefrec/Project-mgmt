const mongoose = require("mongoose");

const shoppingCart = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],
    isTrashed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ShoppingCart = mongoose.model("shoppingCart", shoppingCart);

module.exports.ShoppingCart = ShoppingCart;
