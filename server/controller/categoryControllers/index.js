const Category = require('../../model/category');
const Subcategory = require('../../model/subcategories');
const SubSubcategory = require('../../model/sub-sub-category');


// Create a new category
const createCategory = async (req, res) => {
    const { categoryName, categoryDescription } = req.body;
    
    try {
        const chake = await Category.findOne({ name: categoryName })
        if (chake) {
            return res.status(400).json({ msg: "Category already exists" });
        }
        const newCategory = new Category({ name: categoryName, description: categoryDescription });
        await newCategory.save();
        res.status(201).json({ msg: "Category created successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ msg: "Error creating category", error });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching categories", error });
    }
};

// Delete a category and its subcategories and sub-subcategories
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete all sub-subcategories associated with subcategories of the category
        await SubSubcategory.deleteMany({ subcategory: { $in: await Subcategory.find({ category: id }).select('_id') } });
        // Delete all subcategories associated with the category
        await Subcategory.deleteMany({ category: id });
        // Finally, delete the category itself
        await Category.findByIdAndDelete(id);
        res.status(200).json({ msg: "Category and its subcategories deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting category", error });
    }
};

// Create a new subcategory
const createSubcategory = async (req, res) => {
    const { name, description, categoryId } = req.body;

    try {
        const chake = await Subcategory.findOne({ name, category: categoryId });
        if (chake) {
            return res.status(400).json({ msg: "Subcategory already exists in this category" });
        }
        const newSubcategory = new Subcategory({ name, description, category: categoryId });
        await newSubcategory.save();
        res.status(201).json({ msg: "Subcategory created successfully", subcategory: newSubcategory });
    } catch (error) {
        res.status(500).json({ msg: "Error creating subcategory", error });
    }
};

// Delete a subcategory and its sub-subcategories
const deleteSubcategory = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete all sub-subcategories associated with the subcategory
        await SubSubcategory.deleteMany({ subcategory: id });
        // Then delete the subcategory itself
        await Subcategory.findByIdAndDelete(id);
        res.status(200).json({ msg: "Subcategory and its sub-subcategories deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting subcategory", error });
    }
};

// Create a new sub-subcategory
const createSubSubcategory = async (req, res) => {
    const { name, description, subcategoryId } = req.body;

    try {
        const chake = await SubSubcategory.findOne({ name, subcategory: subcategoryId });
        if (chake) {
            return res.status(400).json({ msg: "Sub-subcategory already exists in this subcategory" });
        }
        const newSubSubcategory = new SubSubcategory({ name, description, subcategory: subcategoryId });
        await newSubSubcategory.save();
        res.status(201).json({ msg: "Sub-subcategory created successfully", subSubcategory: newSubSubcategory });
    } catch (error) {
        res.status(500).json({ msg: "Error creating sub-subcategory", error });
    }
};

// Delete a sub-subcategory
const deleteSubSubcategory = async (req, res) => {
    const { id } = req.params;

    try {
        await SubSubcategory.findByIdAndDelete(id);
        res.status(200).json({ msg: "Sub-subcategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting sub-subcategory", error });
    }
};

const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('category');
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching subcategories", error });
    }
};

const getAllSubSubcategories = async (req, res) => {
    try {
        const subSubcategories = await SubSubcategory.find().populate({
            path: 'subcategory',
            populate: {
                path: 'category'
            }
        });
        
        res.status(200).json(subSubcategories);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching sub-subcategories", error });
    }
};

module.exports = {
    createCategory,
    deleteCategory,
    createSubcategory,
    deleteSubcategory,
    createSubSubcategory,
    deleteSubSubcategory,
    getAllCategories,
    getAllSubcategories,
    getAllSubSubcategories
    
};
