const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    restaurantDescription: {type: String},
    open: {type: Boolean, required: true},
    address: {
        number: {type: Number, required: true},
        street:{type: String, required: true},
        zipcode:{type: Number, required: true}
    },
    RestaurantCategory: { type: mongoose.Schema.Types.ObjectId, ref:'RestaurantCategory',
     required: true}, 
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
  });
restaurantSchema.virtual('courseList', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'Restaurant', 
    justOne: false,
  });
    
    const Restaurant = mongoose.model("Restaurant", restaurantSchema);

    module.exports = Restaurant;