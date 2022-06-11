const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
} = require("../controller/product.controller");
const router = express.Router();
const { validateObjectId } = require("../middleware/validateObjectId");
const { validateProduct } = require("../validation/product.validate");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/productImages/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/:id", validateObjectId, getProductById);
router.get("/", getAllProducts);

router.post("/", upload.single("product_image"), validateProduct, addProduct);

module.exports = router;
