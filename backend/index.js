const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const firmRoutes = require("./routes/firmRoutes");
const path = require("path");
const productRoutes = require("./routes/productRoute.js");

const app = express();
app.use(cors());
const PORT = 4000;
// process.env.PORT ||
dotEnv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/product", productRoutes);
app.listen(PORT, () => {
  console.log(`server started and running at ${PORT}`);
});

app.use("/", (req, res) => {
  res.send("<h1> Welcome to SUBY");
});
