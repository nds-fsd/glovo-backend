const express = require("express");
const productController = require("../controllers/productController");
require("../services/cloudinary.config");
const upload = require("../services/multer");
const router = express.Router();
router.post(
"",
upload.single("image"),
productController.createProduct
);
module.exports = router;