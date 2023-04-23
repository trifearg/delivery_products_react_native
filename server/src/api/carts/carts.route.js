import cartsCtrl from "./carts.controller";

const express = require("express");
const router = express.Router();

router.post("/:customerId/:productId", cartsCtrl.addItemToCart); // добавить товар в корзину
router.get("/:customerId", cartsCtrl.getInfoAboutCart); // получить все товары, находящиеся в корзине пользователя
router.delete("/:customerId/:finalPrice/:token", cartsCtrl.clearCart);
router.delete("/:customerId/:productId", cartsCtrl.deleteProduct); // удалить товар из корзины
router.patch("/:customerId/:productId", cartsCtrl.changeQuantityProducts); // изменить количество продуктов
router.get("/quantity/:customerId/:productId", cartsCtrl.getQuantity); // получить количество товара
module.exports = router;
