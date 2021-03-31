const express = require('express');
const { User } = require('../mongo');
const { UserRouter } = require('./userRouter');
const { RestaurantCategoryRouter } = require('./restaurantCategoryRouter');
const { RestaurantRouter } = require('./restaurantRouter');
const { CourseRouter } = require('./courseRouter');
const { DishRouter } = require('./dishRouter');


const appRouter = express.Router();


appRouter.use('/user', UserRouter);
appRouter.use('/restaurant', RestaurantRouter);
appRouter.use('/restaurantCategory', RestaurantCategoryRouter);
appRouter.use('/course', CourseRouter);
appRouter.use('/dish', DishRouter);


module.exports = appRouter;
