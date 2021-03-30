const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    Restaurant: { type: mongoose.Schema.Types.ObjectId, required: true }
});
    
    const Course = mongoose.model("Course", schema);

    module.exports = Course;