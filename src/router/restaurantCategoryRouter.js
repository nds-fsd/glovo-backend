const express = require('express');

const {RestaurantCatergoryController} = require('../controller');

const RestaurantCatergoryRouter = express.Router();

RestaurantCatergoryRouter.get('/', RestaurantCatergoryController.findAll);

RestaurantCatergoryRouter.get('/:id', RestaurantCatergoryController.findOne);

RestaurantCatergoryRouter.post('/', RestaurantCatergoryController.create);

RestaurantCatergoryRouter.put('/:id', RestaurantCatergoryController.update);

RestaurantCatergoryRouter.delete('/:id', RestaurantCatergoryController.delete);

RestaurantCatergoryRouter.post('/search', RestaurantCatergoryController.search);

module.exports = {RestaurantCatergoryRouter}