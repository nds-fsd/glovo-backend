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
    if(!req.user) {
        return res.status(400).json({message: 'user not Found'})
    }
    console.log(req.user);
    User.findById(req.user.id, (err, user) => {

        if (err) {
            return res.status(500).json({user: err.message})
        }

        // * if the user has already a restaurant, he cant create more
       Restaurant.findOne({user: user._id},(err,restaurant) => {
           if (err) {
               return res.status(500).json({message: error});
           }
           if(restaurant) {
               return res.status(400).json({message: "The user has already created a restaurant"});
           }

           // * confirm we have restaurant category
           if(data.restaurantCategory === undefined) {
               return res.status(400).json({message: 'empty restaurantCategory'});
           }
           RestaurantCategory.findById(data.restaurantCategory, (err, category) => {
               if (err) {
                   return res.status(500).json({restaurantCategory: err.message})
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
                   restaurantCategory: category._id,
                   user: user._id
               })
               newRestaurant.save((err)=>{
                   if (err){ 
                       return res.status(500).json({
                       restaurant: "error creating restaurant",
                       error: err
                   });
               }
                   if (!restaurant) return res.status(201).json({message: "new Restaurant created successfully", newRestaurant})
               })
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

exports.search = (req, res) => {
    const data = req.body;

    Restaurant.find(data)
        .then(objects => {
            res.status(200).json(objects);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

exports.researchA = (req, res) => {
    const data = req.body;

    const searchText = Object.keys(data)
    .reduce((acc, cur) => (`${acc} ${data[cur]}`), '')

    const query = {$text: { $search: searchText }};

    console.log(query);

    Restaurant.find(query, {score: {$meta: "textScore"}})
    .sort({score: {$meta: "textScore"}})
    .then(objects => {
        res.status(200).json(objects);
    })
    .catch(error => {
        res.status(500).json(error);
    })
}