const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    restaurantDescription: {type: String},
    open: {type: Boolean, required: true},
    address: {
        number: {type: Number, required: true},
        street:{type: String, required: true},
        zipcode:{type: Number, required: true}
    },
    RestaurantCategory: { type: mongoose.Schema.Types.ObjectId, required: true }
    
})
    
    const Restaurant = mongoose.model("Restaurant", schema);

    module.exports = Restaurant;