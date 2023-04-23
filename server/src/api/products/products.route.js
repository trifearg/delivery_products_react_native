import productsCtrl from "./products.controller";

const express = require("express");
const router = express.Router();

router.post("/category", productsCtrl.getProductsByCategory);
router.post("/all", productsCtrl.getProducts);
router.post("/createProduct", productsCtrl.createProduct);
router.get("/:id", productsCtrl.getProductById);
router.patch("/:id", productsCtrl.updateProduct);
router.delete("/:id", productsCtrl.deleteProductById);

module.exports = router;
/*
 * Чтобы сделать роут защищенным, добавляем в качестве второго параметра:
 * passport.authenticate('jwt', {session: false})
 * и теперь, чтобы получить доступ к данному ендпоинту, пользоователю необходимо
 * иметь токен, т.е. быть залогиненным
 * */