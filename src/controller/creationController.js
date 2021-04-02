const {Course, Restaurant, Dish, RestaurantCategory} = require('../mongo');


const streets = ["street 1","street 2","street 3", "street 4", "street 5"];
const descriptions = ["description 1","description 2","description 3","description 4","description 5"];
const courses = ["course 1","course 2","course 3","course 4","course 5"]
const dishes = ["dish 1","dish 2","dish 3","dish 4","dish 5"]
const ranInd = Math.floor(Math.random() * descriptions.length);


// with an ID passed in the body as {category: id of the restocategory}
//This Controller creates a Random Restaurant with 5 Courses and 5 dishes on each.

exports.createRes = (req, res) =>{
    const data = req.body
    RestaurantCategory.findById(data.category)
    .then(category => {
        const newRestaurant = new Restaurant({
            name: `Test ${category.name} restaurant ${Math.floor(Math.random() * (100 - 1) + 1)}`,
            restaurantDescription: `${descriptions[ranInd]}`,
            open: true,
            address: {
                number: `${Math.floor(Math.random() * (999 - 100) + 100)}`,
                street: `${streets[ranInd]}`,
                zipcode: `${Math.floor(Math.random() * (19000 - 10000) + 10000)}`
            },
            RestaurantCategory: category._id,
        })
        newRestaurant.save((err) => {
            if (err) return Promise.reject('Error Creating Restaurant', err);
            courses.map((course) =>{
                const newCourse = new Course({
                    name: `${course} ${newRestaurant.name}`,
                    Restaurant: newRestaurant._id,
                })
                newCourse.save((err) => {
                    if (err) return Promise.reject('Error creating courses');
                    dishes.map((dish, index) =>{
                        const newDish = new Dish({
                            name: `${dish} ${newCourse.name}`,
                            price: (22 + index),
                            Course: newCourse._id
                        })
                        newDish.save((err) => {
                            if (err) return Promise.reject('Error creating dishes');
                        });
                    });
                });
            });
        });
        res.status(200).json({message: "Test restaurant created succesfully"});
    })  
    .catch((err) => {
        res.status(500).json({message: err})
    })
    
}
