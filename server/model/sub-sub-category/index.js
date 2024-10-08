const mongoose = require('mongoose');

const subSubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SubSubcategory = mongoose.model('SubSubcategory', subSubcategorySchema);

module.exports = SubSubcategory;
