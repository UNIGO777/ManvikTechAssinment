const express = require('express');
const router = express.Router();

const {
    createCategory,
    deleteCategory,
    createSubcategory,
    deleteSubcategory,
    createSubSubcategory,
    deleteSubSubcategory,
    getAllCategories,
    getAllSubcategories,
    getAllSubSubcategories,
} = require('../../controller/categoryControllers');

// Category routes
router.post('/categories', createCategory);
router.get('/categories', getAllCategories);
router.delete('/categories/:id', deleteCategory);

// Subcategory routes
router.post('/subcategories', createSubcategory);
router.get('/subcategories', getAllSubcategories);
router.delete('/subcategories/:id', deleteSubcategory);

// Sub-Subcategory routes
router.post('/sub-subcategories', createSubSubcategory);
router.get('/sub-subcategories', getAllSubSubcategories);
router.delete('/sub-subcategories/:id', deleteSubSubcategory);

module.exports = router;
