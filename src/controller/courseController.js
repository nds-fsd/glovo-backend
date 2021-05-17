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
  if(!data.Restaurant) {
      return res.status(500).json({message: error})
  }
  Restaurant.findById(data.Restaurant)
  .then(restaurant => {
    if(!data.name) return Promise.reject('Missing name of Course');
    const newCourse = new Course({
      name: data.name, 
      Restaurant: restaurant._id,
    })
    newCourse.save();
  })
  .then((newCourse)=> { res.status(201).json({Message: "Your new course was created Succesfully", newCourse})})
  .catch(error => { res.status(500).json({message: error})});

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
    Course.findByIdAndDelete(id)
    .then((course)=>{
            if(course === null ) return Promise.reject('Course not Found');
            Dish.deleteMany({ Course: course._id },(err,dishes)=>{
                if(err) return console.log("Problem trying to delete the dishes");
            })
        })
    .then(() => {
      res.status(200).json({
        confirmation: "Success",
        message: `The dishes from the Course ${id} have been deleted` ,
        })
    })
    .catch(error=>{
        if(error === 'Course not Found') {
            return res.status(404).json({message: error});
        } else {
            return res.status(500).json({message: error});
        }
      
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

exports.search = async (req, res) => {
  const data = req.body;
  const page = Math.max(0, req.query.page);
  const limit = Math.max(1, req.query.limit);
  const sort = req.query.sort;
  const sortDirection = req.query.dir || 'asc';
  const skip = page * limit;
  let sortObject = {};
  let query = data;
  if (sort && sortDirection) {
      sortObject[sort] = sortDirection === 'asc' ? 1 : -1;
  }

  
  if(data.name) {
      const searchTextReg = data.name.split(' ')
      .reduce((acc, cur) => (`${acc}.*${cur}`), '');
      
      const reg = new RegExp(searchTextReg, "i");
      query.name = { $regex: reg}
  }
  const courseCount = await Course.find(query).countDocuments();

  Course.find(query)
  .limit(limit)
  .skip(skip)
  .sort(sortObject)
  .then((courses) => {
    return res.status(200).json({count: courseCount, list: courses})
  })
  .catch((err) => {
    return res.status(500).json({ message: err });
  })
}

exports.coursesWithDishes = (req, res) => {
    const id = req.params.id;

    Restaurant.findById(id)
    .then(rest => {
        if (!rest) return Promise.reject('Problem finding restaurant');
        Course.find({Restaurant: rest._id}).populate('dishList').exec((error, dishes) => {
            if (error) return Promise.reject('Problem populating courses');;
            res.status(200).json(dishes);
          })
    })
    
    .catch(error => { res.status(500).json({message: error})});
}

exports.coursesOrder = (req,res) => {
  const { course, newOrder } = req.body;

  if ( !course ) {
    return res.status(400).json({message: 'missing course or restaurant'})
  }
  newOrder.forEach((course) => {
    Course.findById(course.id, function (err, doc) {
      if (err) return res.status(500).json({message: 'ALgo fallo'})
      doc.order = course.newPos;
      doc.save();
    });
    })
}