const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    Restaurant: { type: mongoose.Schema.Types.ObjectId, required: true },
    order: {type: Number, default: -1},
},{timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
  });
    
courseSchema.virtual('dishList', {
    ref: 'Dish',
    localField: '_id',
    foreignField: 'Course', 
    justOne: false,
    options: { sort: { order: 1 }}
  });

    const Course = mongoose.model("Course", courseSchema);

    module.exports = Course;