import ordersController from "./orders.controller";

const express = require("express");
const router = express.Router();

router.get("/getOrders/:id", ordersController.getAllOrders);
router.post("/create", ordersController.createOrder);

module.exports = router;