const { Course, Dish } = require('../mongo');


exports.findAll = (req, res) =>{

const handleSuccess = (dishes) => {
  res.status(200).json(dishes)};
const handleError = error => {
  res.status(500).json(error);
}
  Dish.find().then(handleSuccess).catch(handleError);
}

exports.findOne = (req, res) =>{

  const id = req.params.id;
  Dish.findById(id).then((dish) => {
    res.status(200).json(dish);
  }).catch(error => {
    res.status(500).json(error);
  });
}

exports.create = (req, res) => {
  const data = req.body;

  Course.findById(data.Course)
  .then(course => {
    if(!data.name) return Promise.reject('Missing Dish Name');
    console.log(course)
    const newDish = new Dish({
      name: data.name, 
      price: data.price,
      description: data.description,
      Course: course._id,
      Restaurant: course.Restaurant,
    })
    console.log('llego al segundo log')
    newDish.save((error) => {error => { res.status(500).json({aquisecaga: error})}});
  })
  .then((newDish)=> { res.status(201).json({Message: "Your new dish was created Succesfully", newDish})})
  .catch(error => { res.status(500).json({message: error})});

}

exports.deleteDish = (req,res) => {
  const id = req.params.id;
  Dish.findByIdAndDelete(id)
  .then(() => {
    res.status(200).json({message: "Your dish has been deleted Succesfully"})
  })
  .catch(error=>{
    res.status(500).json(error);
  })
}

exports.update = (req,res) => {
  const id = req.params.id;
  const data = req.body;

  Dish.findByIdAndUpdate(id,data)
  .then(() => {
    res.status(200).json({
      message: "Your Dish has been updated Succesfully"})
  })
  .catch(error=>{
    res.status(500).json(error);
  })
}

exports.search = (req, res) => {
  const data = req.body;
  
  Dish.find(data)
  .then(dish => {
    res.status(200).json(dish);
  })
  .catch(error => {
    res.status(500).json(error);
  });
}
//recieves {newCourse: 'the collection where to move', dishId: 'the id of the moving dish'}
exports.switchCourse = (req,res) => {
  const data = req.body;
  if(!data.newCourse || !data.dishId){
    return res.status(400).json({message: 'no Course or Dish provided'});
  }
  Course.findById(data.newCourse,(err,cour) => {
    if (err) return res.status(500).json({message: 'problem looking for course'});
    Dish.findByIdAndUpdate(data.dishId,{Course: cour._id},(err,dish)=>{
      if (err) return res.status(500).json({message: 'Problem changing id'});
      console.log('dish updated', dish)
      res.status(200).json({message: 'task updated', dish})
    })
  })
}

exports.dishesOrder = (req,res) => {
  const { course, newOrder } = req.body;

  if ( !course ) {
    return res.status(400).json({message: 'missing course or restaurant'})
  }
  newOrder.forEach((dish) => {
    Dish.findById(dish.id, function (err, doc) {
      if (err) return res.status(500).json({message: 'ALgo fallo'})
      doc.order = dish.newPos;
      doc.save();
    });
    })
}