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
    const newDish = new Dish({
      name: data.name, 
      price: data.price,
      Course: course._id,
      Restaurant: course.Restaurant,
    })
    newDish.save();
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
