const Product = require("../models/Product.js");
const multer = require("multer");
const path = require("path");
const Firm = require("../models/Firm.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder where the uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
  },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const firmId = req.params.firmId;

    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ error: "No firm found" });
    }
    const product = new Product({
      productName,
      price,
      category,
      bestSeller,
      description,
      image,
      firm: firm._id,
    });

    const savedProduct = await product.save();
    firm.products.push(savedProduct);
    await firm.save();
    res.status(200).json({ savedProduct });
  } catch (e) {
    console.log(e);
    console.log("issue");

    return res.status(500).json({ error: "internal error" });
  }
};

const getProductByFirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ error: "no firm found" });
    }
    const restaurantName = firm.firmName;

    const products = await Product.find({ firm: firmId });
    res.status(200).json({ restaurantName, products });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "internal server error" });
  }
};

const deletedProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    // await Firm.save();
    if (!deletedProduct) {
      return res.status(404).json({ error: "No message found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductByFirm,
  deletedProductById,
};
