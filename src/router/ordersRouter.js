const express = require("express");

const { OrdersController } = require("../controller");

const OrdersRouter = express.Router();

OrdersRouter.get("/search", OrdersController.search);

OrdersRouter.get("/", OrdersController.findAll);

OrdersRouter.get("/:id", OrdersController.findOne);

OrdersRouter.post("/", OrdersController.create);

OrdersRouter.patch("/:id", OrdersController.update);

OrdersRouter.delete("/:id", OrdersController.deleteOrder);



module.exports = { OrdersRouter };
