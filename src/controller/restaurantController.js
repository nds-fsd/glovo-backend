const { Restaurant, RestaurantCategory, Course, Dish, User } = require('../mongo');

exports.findAll = (req, res) => {

    const handleSuccess = (resto) => {
        res.status(200).json(resto);
    };
    const handleError = error => {
        res.status(500).json(error);
    }
    Restaurant.find().then(handleSuccess).catch(handleError);
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurant.findById(id)
    .populate('restaurantCategory')
    .populate({
        path: 'courseList',
        populate: {
            path: 'dishList'
        },
    })
        .exec((error, dishes) => {
            if (error) return res.status(500).json({ message: error });
            res.status(200).json(dishes);
        })    
};

// * Restaurant controller updated to work with JWT
exports.create = (req, res) => {
    const data = req.body;
    console.log(data)
    // * error to confirm we have a user
    if(!data.user) {
        return res.status(400).json({message: 'user not Found'})
    }
    
    User.findById(data.user, (err, user) => {

        if (err) {
            return res.status(500).json({user: err.message})
        }

        // * if the user has already a restaurant, he cant create more
       Restaurant.findOne({user: user._id},(err,restaurant) => {
           if (err) {
               return res.status(500).json({message: error});
           }

           // * confirm we have restaurant category
           if(data.restaurantCategory.length === 0) {
               return res.status(400).json({message: 'empty restaurantCategory'});
           }
           
               const newRestaurant = new Restaurant({
                   name: data.name,
                   restaurantDescription: data.restaurantDescription,
                   open: data.open,
                   address: {
                       number: data.address.number,
                       street: data.address.street,
                       zipcode: data.address.zipcode
                   },
                   restaurantCategory: data.restaurantCategory,
                   user: user._id
               })
               newRestaurant.save((err)=>{
                   if (err){ 
                       return res.status(500).json({
                       restaurant: "error creating restaurant",
                       error: err
                   });
               }
                return res.status(201).json({message: "new Restaurant created successfully", newRestaurant})
            })
       })
    })
    .catch((err) => {
        return res.status(500).json({message: 'major error', err})
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Restaurant.findByIdAndDelete(id)
        .then((restaurant) => {
            if (restaurant === null) return Promise.reject('Restaurant not Found');
            Course.deleteMany({ Restaurant: restaurant._id }, (err, query) => {
                if (err) {
                    return console.log("Problem trying to delete the courses")
                }
                console.log("Courses deleted")
                Dish.deleteMany({ Restaurant: restaurant._id }, (err, query) => {
                    if (err) {
                        return console.log("Problem trying to delete the dishes")
                    }
                    return console.log("dishes deleted")
                })
            })
        })
        .then(() => {
            res.status(200).json({
                confirmation: "Success",
                message: `The Restaurant has been deleted`,
            })
        })
        .catch(error => {
            if (error === 'Restaurant not Found') {
                return res.status(404).json({ message: error });
            } else {
                return res.status(500).json({ message: error });
            }

        })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    Restaurant.findByIdAndUpdate(id, data)
        .then(() => {
            res.status(200).json({
                message: "Your restaurant has been updated Succesfully"
            })
        })
        .catch(error => {
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
    const restCount = await Restaurant.find(query).countDocuments();

    Restaurant.find(query)
    .limit(limit)
    .skip(skip)
    .sort(sortObject)
    .populate('restaurantCategory')
        .exec((error, restaurant) => {
            if (error) return res.status(500).json({ message: error });
            res.status(200).json({count: restCount, list: restaurant});
        })   
}

exports.researchA = (req, res) => {
    const data = req.body;
    const searchText = Object.keys(data)
    .reduce((acc, cur) => (`${acc} ${data[cur]}`), '')

    const query = {$text: { $search: searchText }};

    const searchTextReg = req.body.search.split(' ')
    .reduce((acc, cur) => (`${acc}.*${cur}`), '');

    const reg = new RegExp(searchTextReg, "i");
    const query2 = {name: { $regex: reg}};

    Restaurant.find(query, {score: {$meta: "textScore"}})
    .sort({score: {$meta: "textScore"}})
    .then(objects => {
        if (objects.length > 0){
        res.status(200).json(objects);}
        else{
            Restaurant.find(query2)
    .then(objects => {
        res.status(200).json(objects);
    })
    .catch(error => {
        res.status(500).json(error)
    })
        }
    })
    .catch(error => {
        res.status(500).json(error);
    })
}
