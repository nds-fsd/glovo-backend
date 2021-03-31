const express = require('express');
const {RestaurantController} = require('../controller')

const RestaurantRouter = express.Router()

RestaurantRouter.get('/restaurantInfo', RestaurantController.findAll);

RestaurantRouter.get('/restaurantInfo/:id', RestaurantController.findOne);

RestaurantRouter.post('/restaurantInfo', RestaurantController.create);

RestaurantRouter.put('/restaurantInfo/:id', RestaurantController.update);

RestaurantRouter.post('/restaurantInfo/search', RestaurantController.search)

module.exports = {RestaurantRouter}