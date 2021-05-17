const express = require("express");
const { UserRouter } = require("./userRouter");
const { RestaurantCategoryRouter } = require("./restaurantCategoryRouter");
const { RestaurantRouter } = require("./restaurantRouter");
const { CourseRouter } = require("./courseRouter");
const { DishRouter } = require("./dishRouter");
const { OrdersRouter } = require("./ordersRouter");
const { CreationRouter } = require("./creationRouter");

const appRouter = express.Router();

appRouter.use("/user", UserRouter);
appRouter.use("/restaurant", RestaurantRouter);
appRouter.use("/restaurantCategory", RestaurantCategoryRouter);
appRouter.use("/course", CourseRouter);
appRouter.use("/dish", DishRouter);
appRouter.use("/orders", OrdersRouter);
//The creation router is to create a random restaurant linked to a specific resto category
appRouter.use("/create", CreationRouter);

module.exports = appRouter;
