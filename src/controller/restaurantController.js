const { Restaurant } = require('../mongo')

exports.findAll = (req, res) => {

    const handleSuccess = (resto) => {
        res.status(200).json(resto)
    };
    const handleError = error => {
        res.status(500).json(error);
    }
    Restaurant.find().then(handleSuccess).catch(handleError);
}

exports.findOne = (req, res) => {

    const id = req.params.id;
    Restaurant.findById(id).then((resto) => {
        res.status(200).json(resto);
    }).catch(error => {
        res.status(500).json(error);
    });
}


exports.create = (req, res) => {
    const data = req.body;

    const newRestaurant = new Restaurant(data)

    newRestaurant.save()
        .then((newRestaurant => {
            res.status(201).json({
                Message: "Your new restaurant was created Succesfully", newRestaurant
            })
        }))
        .catch(error => { res.status(500).json(error) })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Restaurant.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "Your restaurant has been deleted Succesfully" })
        })
        .catch(error => {
            res.status(500).json(error);
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