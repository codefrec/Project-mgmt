const { ShoppingCart } = require("../model/shoppingCart.model");
const { Product } = require("../model/product.model");
const errMsg = require("../utils/errorMessages.json");

const getCartById = async (req, res, next) => {
  const cart = await ShoppingCart.findOne({
    _id: req.params.id,
    isTrashed: false,
  })
    .populate({ path: "items", populate: { path: "product" } })
    .select("-__v -createdAt -updatedAt -isTrashed");

  if (!cart)
    return res.status(400).send(errMsg.SHOPPING_CART_API.CART_NOT_FOUND);

  cart.items = cart.items.filter((item) => item.quantity > 0);

  res.status(200).send(cart);
};

// const getCarts = async (req, res, next) => {
//   if (!req.user.isAdmin)
//     return res.status(401).send({ message: "You don't have permission.'" });

//   const carts = await ShoppingCart.find({
//     isTrashed: false,
//   })
//     .populate({ path: "items", populate: { path: "product" } })
//     .sort("-createdAt")
//     .select("-__v -createdAt -updatedAt -isTrashed");

//   res.status(200).send(carts);
// };

const createCart = async (req, res, next) => {
  cart = await new ShoppingCart({
    items: [],
  }).save();
  cart = await cart.populate({ path: "items", populate: { path: "product" } });
  res.status(200).send(cart);
};

const createOrUpdateCart = async (req, res, next) => {
  let product = await Product.findOne({
    _id: req.body.product,
    isTrashed: false,
  });
  if (!product) return res.status(400).send(errMsg.GLOBAL.PRODUCT_NOT_FOUND);

  let cart = await ShoppingCart.findOne({
    _id: req.params.id,
    isTrashed: false,
  });

  if (cart) {
    let productIndex = cart.items.findIndex(
      (i) => i.product.toString() === req.body.product
    );
    if (productIndex > -1) {
      let quantity = cart.items[productIndex].quantity;

      cart.items[productIndex].quantity =
        req.body.action === "add"
          ? (quantity += 1)
          : quantity > 0
          ? (quantity -= 1)
          : 0;
    } else {
      cart.items.push({
        product: req.body.product,
        quantity: req.body.action === "add" ? 1 : 0,
      });
    }
  } else {
    cart = new ShoppingCart({
      items: [{ product: req.body.product, quantity: 1 }],
    });
  }

  cart = await cart.save();
  cart = await cart.populate({ path: "items", populate: { path: "product" } });
  cart.items = cart.items.filter((item) => item.quantity > 0);
  res.status(200).send(cart);
};

module.exports = {
  getCartById,
  //   getCarts,
  createCart,
  createOrUpdateCart,
};
