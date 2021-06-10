require("./connection");
const User = require("./schemas/user.js");
const RestaurantCategory = require("./schemas/restaurantCategory.js");
const Restaurant = require("./schemas/restaurant.js");
const Course = require("./schemas/course.js");
const Dish = require("./schemas/dish.js");
const Order = require("./schemas/order.js");

const initSuperAdmin = async () => {
    const superAdmin = await User.find({email: 'super@admin.com'});
    
    if(superAdmin.length === 0) {
        const admin = new User({
            email: 'super@admin.com',
            password: 'Admin123',
            firstName: 'admin',
            role: 'SUPER_ADMIN',
          })
          console.log('Creating SUPER_ADMIN')
          return admin.save();
    } else {
        return null;
    }
}

initSuperAdmin();

module.exports = {
	User,
	RestaurantCategory,
	Restaurant,
	Course,
    Dish,
    Order,
}

