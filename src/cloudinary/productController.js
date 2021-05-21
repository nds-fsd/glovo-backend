exports.createProduct = async (req, res, next) => {
    let data = req.body;
    try {
    let createdProduct = await new Product({imagePath: req.file.url}).save();
    res.status(201).json({
    message: "Product added successfully",
    post: {...createdProduct,id: createdProduct._id,},
    });
    } catch (err) {
    res.status(500).json({
    message: "Creating a product failed!",});
    }
    };