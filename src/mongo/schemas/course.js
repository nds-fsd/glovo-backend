const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    Restaurant: { type: mongoose.Schema.Types.ObjectId, required: true }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
  });
    
courseSchema.virtual('dishList', {
    ref: 'Dish',
    localField: '_id',
    foreignField: 'Course', 
    justOne: false,
  });

    const Course = mongoose.model("Course", courseSchema);

    module.exports = Course;