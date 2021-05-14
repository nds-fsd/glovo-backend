const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    order: {type: Number, default: -1},
    description: {type: String},
    Course: { type: mongoose.Schema.Types.ObjectId, required: true },
    Restaurant: { type: mongoose.Schema.Types.ObjectId, required: true },
},{timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }},
);
    
    
    
    const Dish = mongoose.model("Dish", schema);

    module.exports = Dish;
