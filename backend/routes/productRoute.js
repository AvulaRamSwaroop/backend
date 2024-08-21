const express = require("express");
const productcController = require("../controllers/productController.js");
const Firm = require("../controllers/firmController");

const router = express.Router();

router.post("/add-product/:firmId", productcController.addProduct);

router.get("/:firmId/products", productcController.getProductByFirm);

router.delete("/:productId", productcController.deletedProductById);

module.exports = router;
