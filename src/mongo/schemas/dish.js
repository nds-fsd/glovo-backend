const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    Course: { type: mongoose.Schema.Types.ObjectId, required: true }
});
    
    
    
    const Dish = mongoose.model("Dish", schema);

    module.exports = Dish;