const express = require('express');

const {RestaurantCategoryController} = require('../controller');

const RestaurantCategoryRouter = express.Router();

RestaurantCategoryRouter.get('/', RestaurantCategoryController.findAll);

RestaurantCategoryRouter.get('/:id', RestaurantCategoryController.findOne);

RestaurantCategoryRouter.post('/', RestaurantCategoryController.create);

RestaurantCategoryRouter.patch('/:id', RestaurantCategoryController.update);

RestaurantCategoryRouter.delete('/:id', RestaurantCategoryController.delete);

RestaurantCategoryRouter.post('/search', RestaurantCategoryController.search);

RestaurantCategoryRouter.post('/nameSearch', RestaurantCategoryController.nameSearch);

module.exports = {RestaurantCategoryRouter}