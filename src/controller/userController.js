const {User} = require('../mongo');


exports.findAll = (req, res) =>{

const handleSuccess = (users) => {
  res.status(200).json(users)};
const handleError = error => {
  res.status(500).json(error);
}
  User.find().then(handleSuccess).catch(handleError);
}

exports.findOne = (req, res) =>{

  const id = req.params.id;
  User.findById(id).then((user) => {
    res.status(200).json(user);
  }).catch(error => {
    res.status(500).json(error);
  });
}


exports.create = (req, res) => {
  const data = req.body;

  const newUser = new User({
    email: data.email,
    password: data.password,
    name: data.name
  })
  
  newUser.save()
  .then((newUser)=> { res.status(201).json({Message: "Your new User was created Succesfully", newUser})})
  .catch(error => { res.status(500).json(error)});

}

exports.delete = (req,res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
  .then(() => {
    res.status(200).json({message: "Your user has been deleted Succesfully"})
  })
  .catch(error=>{
    res.status(500).json(error);
  })
}

exports.update = (req,res) => {
  const id = req.params.id;
  const data = req.body;

  User.findByIdAndUpdate(id,data)
  .then(() => {
    res.status(200).json({
      message: "Your user has been updated Succesfully"})
  })
  .catch(error=>{
    res.status(500).json(error);
  })
}

exports.search = (req, res) => {
  const data = req.body;
  
  User.find(data)
  .then(objects => {
    res.status(200).json(objects);
  })
  .catch(error => {
    res.status(500).json(error);
  });
}