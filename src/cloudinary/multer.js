const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const storage = cloudinaryStorage({
folder: "Globo",
allowedFormats: ["jpg", "png", "HEIC", "jpeg"],
transformation: [{
width: 500,
height: 500,
crop: "limit"
}],
cloudinary: cloudinary
});
module.exports = multer({storage: storage});