require("./connection");
const User = require("./schemas/user.js");
const RestaurantCategory = require("./schemas/restaurantCategory.js");
const Restaurant = require("./schemas/restaurant.js");
const Course = require("./schemas/course.js");
const Dish = require("./schemas/dish.js");
const Order = require("./schemas/order.js");

module.exports = {
	User,
	RestaurantCategory,
	Restaurant,
	Course,
    Dish,
    Order,
}

