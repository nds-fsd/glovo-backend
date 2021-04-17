const express = require('express');
const {RestaurantController} = require('../controller')

const RestaurantRouter = express.Router()

RestaurantRouter.get('/', RestaurantController.findAll);

RestaurantRouter.get('/:id', RestaurantController.findOne);

RestaurantRouter.post('/', RestaurantController.create);

RestaurantRouter.patch('/:id', RestaurantController.update);

RestaurantRouter.post('/search', RestaurantController.search);

RestaurantRouter.delete('/:id', RestaurantController.delete);

module.exports = {RestaurantRouter}