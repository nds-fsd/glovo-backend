const {Course, Restaurant, Dish} = require('../mongo');


exports.findAll = (req, res) =>{

const handleSuccess = (courses) => {
  res.status(200).json(courses)};
const handleError = error => {
  res.status(500).json(error);
}
  Course.find().then(handleSuccess).catch(handleError);
}

exports.findOne = (req, res) =>{

  const id = req.params.id;
  Course.findById(id).then((course) => {
    res.status(200).json(course);
  }).catch(error => {
    res.status(500).json(error);
  });
}


exports.create = (req, res) => {
  const data = req.body;
  Restaurant.findById(data.Restaurant)
  .then(restaurant => {
    if(!data.name) return res.status(500).json({Message: "Missing name of Course",});
    const newCourse = new Course({
      name: data.name, 
      Restaurant: restaurant._id,
    })
    newCourse.save();
  })
  .then((newCourse)=> { res.status(201).json({Message: "Your new course was created Succesfully", newCourse})})
  .catch(error => { res.status(500).json(error)});

}

exports.deleteCourse = (req,res) => {
  const id = req.params.id;
  Course.findByIdAndDelete(id)
  .then(() => {
    res.status(200).json({message: "Your Course has been deleted Succesfully"})
  })
  .catch(error=>{
    res.status(500).json(error);
  })
}
exports.deleteCoursesAndDishes = (req,res) => {
    const id = req.params.id;
    Course.findById(id).then((course)=>{
      Dish.deleteMany({ Course: course._id },(err,dishes)=>{
        if(err) {
          return res.status(500).json({message: err.getMessage()})
        }
        console.log(`The Dishes from the Course ${course.name} have been removed`)
      });
    });
    Course.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({message: "Your Course has been deleted Succesfully"})
    })
    .catch(error=>{
      res.status(500).json(error);
    })
  }

exports.update = (req,res) => {
  const id = req.params.id;
  const data = req.body;

  Course.findByIdAndUpdate(id,data)
  .then(() => {
    res.status(200).json({
      message: "Your Course has been updated Succesfully"})
  })
  .catch(error=>{
    res.status(500).json(error);
  })
}

exports.search = (req, res) => {
  const data = req.body;
  
  Course.find(data)
  .then(course => {
    res.status(200).json(course);
  })
  .catch(error => {
    res.status(500).json(error);
  });
}