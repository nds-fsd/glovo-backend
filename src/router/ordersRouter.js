const express = require("express");

const { OrdersController } = require("../controller");

const OrdersRouter = express.Router();

OrdersRouter.get("/", OrdersController.findAll);

OrdersRouter.get("/:id", OrdersController.findOne);

OrdersRouter.post("/", OrdersController.create);

OrdersRouter.put("/:id", OrdersController.update);

OrdersRouter.delete("/:id", OrdersController.deleteOrder);

OrdersRouter.get("/search", OrdersController.search);


module.exports = { OrdersRouter };
