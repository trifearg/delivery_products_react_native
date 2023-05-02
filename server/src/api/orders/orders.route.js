import ordersController from "./orders.controller";

const express = require("express");
const router = express.Router();

router.post("/getOrders", ordersController.getAllOrders);
router.post("/create", ordersController.createOrder);

module.exports = router;