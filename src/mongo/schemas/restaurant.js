const mongoose = require('mongoose');
const { schema } = require('./user');

const restaurantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    restaurantDescription: {type: String},
    open: {type: Boolean, required: true},
    address: {
        number: {type: String, required: true},
        street:{type: String, required: true},
        zipcode:{type: Number, required: true}
    },
    restaurantCategory: { type: mongoose.Schema.Types.ObjectId, ref:'RestaurantCategory',
      required: true},
      user:  { type: mongoose.Schema.Types.ObjectId, ref:'User',
      required: true}
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
    options: { sort: { order: 1 }}
  });

    schema.index({name:'text', restaurantDescription:'text'})
    
    const Restaurant = mongoose.model("Restaurant", restaurantSchema);

    module.exports = Restaurant;