

const Product = require('../../model/product');

// Create a new product
const createProduct = async (req, res) => {
    
    const { name, description, price, stock, subSubcategory, image } = req.body;

    try {
        const newProduct = new Product({ name, description, price, stock, subSubcategory ,image });
        await newProduct.save();
        res.status(201).json({ msg: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ msg: "Error creating product", error });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting product", error });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('subSubcategory');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching products", error });
    }
};


module.exports = {
    createProduct, deleteProduct,getAllProducts
}