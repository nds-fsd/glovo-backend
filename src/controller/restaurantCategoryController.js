const {RestaurantCategory, Restaurant} = require('../mongo');
const {RestaurantController} = require('../controller');

exports.findAll = (req, res) => {

    const handleSuccess = (restoCat) => {
        res.status(200).json(restoCat)
    };
    const handleError = error => {
        res.status(500).json(error);
    }
    RestaurantCategory.find().sort({ name: 1 }).then(handleSuccess).catch(handleError);
}

exports.findOne = (req, res) => {

    const id = req.params.id;
    RestaurantCategory.findById(id).then((restoCat) => {
        res.status(200).json(restoCat);
    }).catch(error => {
        res.status(500).json(error);
    });
}


exports.create = (req, res) => {
    const data = req.body;

    if(!data.name) return res.status(400)
    .json({Message: "missing name of restaurant category"})

    const newRestaurantCategory = new RestaurantCategory({
        name: data.name,
    })

    newRestaurantCategory.save()
        .then((newRestaurantCategory => {
            res.status(201).json({
                Message: "Your new category was created Succesfully", newRestaurantCategory
            })
        }))
        .catch(error => { res.status(500).json(error) })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    RestaurantCategory.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "Your category has been deleted Succesfully" })
        })
        .catch(error => {
            res.status(500).json(error);
        })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    RestaurantCategory.findByIdAndUpdate(id, data)
        .then(() => {
            res.status(200).json({
                message: "Your category has been updated Succesfully"
            })
        })
        .catch(error => {
            res.status(500).json(error);
        })
}

exports.search = (req, res) => {
    const data = req.body;

    RestaurantCategory.find(data)
        .then(objects => {
            res.status(200).json(objects);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

exports.nameSearch = (req, res) => {
    const data = req.body;
    RestaurantCategory.find(data)
        .then(objects => {
            Restaurant.find({restaurantCategory: objects[0]._id})
            .then(object => {
                res.status(200).json(object);
            })
        })
        .catch(error => {
            res.status(500).json(error);
        });
        
}