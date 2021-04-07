const { Restaurant, RestaurantCategory, Course, Dish } = require('../mongo')

exports.findAll = (req, res) => {

    const handleSuccess = (resto) => {
        res.status(200).json(resto);
    };
    const handleError = error => {
        res.status(500).json(error);
    }
    Restaurant.find().then(handleSuccess).catch(handleError);
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurant.findById(id).populate({
        path: 'courseList',
        populate: {
            path: 'dishList'
        }
    })
    .exec((error, dishes) => {
        if (error) return res.status(500).json({message: error});
        res.status(200).json(dishes);
      });
}


exports.create = (req, res) => {
    const data = req.body;

    RestaurantCategory.findById(data.RestaurantCategory)
        .then(restoCat => {
            if (!data.name || isNaN(data.address.number)) return Promise.reject("Missing restaurant details");

            const newRestaurant = new Restaurant({
                name: data.name,
                restaurantDescription: data.restaurantDescription,
                open: data.open,
                address: {
                    number: data.address.number,
                    street: data.address.street,
                    zipcode: data.address.zipcode
                },
                RestaurantCategory: restoCat._id,
            })

            return newRestaurant.save()
        })
        .then((newRestaurant) => {
            res.status(201).json(newRestaurant)
        })
        .catch(error => { res.status(500).json({message: error}) })
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Restaurant.findByIdAndDelete(id)
    .then((restaurant) => {
        if(restaurant === null ) return Promise.reject('Restaurant not Found');
        Course.deleteMany({ Restaurant: restaurant._id },(err,query)=>{
            if(err) {
               return console.log("Problem trying to delete the courses")
            }
                console.log("Courses deleted")
            Dish.deleteMany({ Restaurant: restaurant._id },(err,query) => {
                if(err) {
                    return console.log("Problem trying to delete the dishes")
                 }
                 return console.log("dishes deleted")
            } )
        })
    })
    .then(() => {
      res.status(200).json({
        confirmation: "Success",
        message: `The Restaurant has been deleted` ,
        })
    })
    .catch(error=>{
        if(error === 'Restaurant not Found') {
            return res.status(404).json({message: error});
        } else {
            return res.status(500).json({message: error});
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