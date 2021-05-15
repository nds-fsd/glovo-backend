const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    User: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    Restaurant: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Restaurant' },
    orderList: [{
        Dish: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Dish'},
        qty: { type: Number, required: true, default: 1}
    }],
    status: {type: Boolean, required: true, default: false},
    total: {type: Number, required: true}
},{timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
  });
    


    const Order = mongoose.model("Order", orderSchema);

    module.exports = Order;