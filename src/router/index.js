const express = require('express');
const { User } = require('../mongo');
const {UserRouter} = require('./userRouter');


const appRouter = express.Router();


appRouter.use('/user', UserRouter);


module.exports = appRouter;
