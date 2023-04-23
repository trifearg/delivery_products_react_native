import { cart, cartProduct, product, photo } from '../index';

export class CartDAO {
    // create cart - работает в качестве триггера
    static async createCart(newCart) {
        await cart.create(newCart).then(() => console.log("Создана новая корзина!"));
    };

    // delete cart - работает в качестве триггера
    static async deleteCart(customerId) {
        await cart.destroy({
            where: {
                id_customer: customerId
            }
        }).then(() => console.log("Корзина успешно удалена!"));
    };

    static async getInfoAboutCart(req) {
        let info = await cart.findAll({
            where: {
                id_customer: req.params.customerId
            },
            include: [{
                model: cartProduct,
                attributes: ['quantity'],
                include: [{
                    model: product,
                    required: false,
                    attributes: ['id', 'name', 'price'],
                    include: [{
                        model: photo,
                        attributes: ['photo_name', 'photo'],
                        required: false
                    }]
                }]
            }]
        });
        return info[0]['cart_products'];
    }

    // добавить товар в корзину
    static async addItemToCart(req) {
        const cartId = await this.getCartId(req);
        let quantityProduct = await this.getQuantity(req);
        let item;

        if (quantityProduct.quantity === 0) {
            item = await cartProduct.create({
                id_cart: cartId,
                id_product: req.params.productId
            });
        } else {
            req.body.quantity = quantityProduct.quantity += 1;
            item = await this.changeQuantityProducts(req)
        }
        return item;
    }

    // очистить корзину
    static async clearCart(req) {
        let response;
        await cart.findOne({
            where: {
                id_customer: req.params.customerId
            }
        }).then(data => response = data);
        await cartProduct.destroy({
            where: {
                id_cart: response.id
            }
        }).then(() => response = {
            message: "Корзина очищена!"
        });
        return response;
    }

    // удалить продукт из корзины
    static async deleteProduct(req) {
        let response;
        let cartId = await this.getCartId(req)
        await cartProduct.destroy({
            where: {
                id_cart: cartId,
                id_product: req.params.productId
            }
        }).then(() => response = {
            message: "Продукт удалён!"
        });
        return response;
    }

    // изменить количество продуктов
    static async changeQuantityProducts(req) {
        let response;
        let cartId = await this.getCartId(req);

        await cartProduct.update({
            quantity: +req.body.quantity
        }, {
            where: {
                id_cart: cartId,
                id_product: req.params.productId
            }
        }).then(() => response = {
            message: "Количество продуктов изменено!"
        });
        return response;
    }

    // получить ID корзины на основе ID пользователя
    static async getCartId(req) {
        let cartId = await cart.findOne({
            where: {
                id_customer: req.params.customerId
            }
        });
        return cartId.dataValues.id;
    }

    static async getQuantity(req) {
        let cartId = await this.getCartId(req);
        let response = await cartProduct.findOne({
            where: {
                id_cart: cartId,
                id_product: req.params.productId
            }
        });
        if (response === null) {
            return { quantity: 0 }
        }
        return { quantity: response.quantity };
    }
}
