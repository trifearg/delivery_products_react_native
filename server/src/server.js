const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

export const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const customerRoutes = require("./api/customers/customers.route");
const productRoutes = require("./api/products/products.route");
const cartRoutes = require("./api/carts/carts.route");
const orderRoutes = require("./api/orders/orders.route");

app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
