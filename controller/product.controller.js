const { Product } = require("../model/product.model");
const errMsg = require("../utils/errorMessages.json");
const fs = require("fs");

module.exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find({ isTrashed: false })
    .select("-isTrashed -__v")
    .sort("createdAt");
  return res.status(200).send({ data: products });
};

module.exports.getProductById = async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.id,
    isTrashed: false,
  }).select("-isTrashed -__v");
  if (!product) return res.status(404).send(errMsg.GLOBAL.PRODUCT_NOT_FOUND);
  return res.status(200).send({ data: product });
};

module.exports.addProduct = async (req, res, next) => {
  let product = await new Product({
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    product_image: req.file && req.file.filename,
    price: req.body.price,
  }).save();

  res.status(200).send({ status: 200, data: { product } });
};

function deleteFile(file) {
  if (file) {
    try {
      fs.existsSync(file.path) && fs.unlinkSync(file.path);
      return;
    } catch (err) {
      return;
    }
  }
}
