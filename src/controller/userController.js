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
    if(data.email) {
        const searchTextReg = data.email.split(' ')
        .reduce((acc, cur) => (`${acc}.*${cur}`), '');
        
        const reg = new RegExp(searchTextReg, "i");
        query.email = { $regex: reg}
        
    }
    const userCount = await User.find(query).countDocuments();
    User.find(query)
    .limit(limit)
    .skip(skip)
    .sort(sortObject)
    .then((users) => {
        return res.status(200).json({count: userCount, list: users})
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      })
}