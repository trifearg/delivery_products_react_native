import customersCtrl from "./customers.controller";

const passport = require("passport");
const express = require("express");
const router = express.Router();

router.post("/register", customersCtrl.createCustomer);
router.post("/login", customersCtrl.loginCustomer);
router.get("/:id", customersCtrl.getCustomerById);
router.patch("/:id", customersCtrl.updateCustomer);
router.patch("/:id", passport.authenticate('jwt', { session: false }), customersCtrl.updateCustomer);
router.delete("/:id", customersCtrl.deleteCustomerById);

module.exports = router;