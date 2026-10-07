// controllers/itemController.js
// Business logic for Product CRUD operations

const Product = require('../models/item');

// POST /api/products - Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, inStock } = req.body;
    const product = new Product({ name, price, inStock });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error while creating product' });
  }
};

// GET /api/products - Retrieve all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching products' });
  }
};

// GET /api/products/:id - Retrieve a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }
    res.status(500).json({ error: 'Server error while fetching product' });
  }
};

// PUT /api/products/:id - Update a product's name or price
exports.updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (price !== undefined) updateFields.price = price;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }
    res.status(500).json({ error: 'Server error while updating product' });
  }
};

// DELETE /api/products/:id - Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }
    res.status(500).json({ error: 'Server error while deleting product' });
  }
};
