const express = require('express');

const { DishController } = require('../controller');

const DishRouter = express.Router();

DishRouter.get('/', DishController.findAll);

DishRouter.get('/:id', DishController.findOne);

DishRouter.post('/', DishController.create);

DishRouter.patch('/:id', DishController.update);

DishRouter.delete('/:id', DishController.deleteDish);

DishRouter.post('/search', DishController.search);

DishRouter.post('/change', DishController.switchCourse);

module.exports = {DishRouter}