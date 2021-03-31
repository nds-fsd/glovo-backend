const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String, required: true},
});


const RestaurantCategory = mongoose.model("RestaurantCategory", schema);

module.exports = RestaurantCategory;