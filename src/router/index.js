const express = require('express');
const { User } = require('../mongo');
const {UserRouter} = require('./userRouter');
const {RestaurantRouter} = require('./restaurantRouter')


const appRouter = express.Router();


appRouter.use('/user', UserRouter);
appRouter.use('/restaurant', RestaurantRouter);


module.exports = appRouter;
