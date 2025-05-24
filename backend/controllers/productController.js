const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'خطأ في جلب المنتجات' });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log('Fetching product with ID:', productId);

        if (!productId || !productId.match(/^[0-9a-fA-F]{24}$/)) {
            console.error('Invalid product ID format:', productId);
            return res.status(400).json({ message: 'معرف المنتج غير صالح' });
        }

        const product = await Product.findById(productId);
        console.log('Product found:', product);

        if (product) {
            res.json(product);
        } else {
            console.error('Product not found with ID:', productId);
            res.status(404).json({ message: 'المنتج غير موجود' });
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'خطأ في جلب المنتج', error: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, brand, category, countInStock } = req.body;

        const product = new Product({
            name,
            price,
            user: req.user ? req.user._id : '645ca0b5082174f83d8e02e9', // Default user ID for development
            image,
            brand,
            category,
            countInStock,
            numReviews: 0,
            description,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ message: 'بيانات المنتج غير صالحة', error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, image, brand, category, countInStock } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.countInStock = countInStock || product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'المنتج غير موجود' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(400).json({ message: 'بيانات المنتج غير صالحة', error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: req.params.id });
            res.json({ message: 'تم حذف المنتج' });
        } else {
            res.status(404).json({ message: 'المنتج غير موجود' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'خطأ في حذف المنتج', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}; 