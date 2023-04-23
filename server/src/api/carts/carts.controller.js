import {CartDAO} from "../../dao/cartDAO";
import jwt_decode from 'jwt-decode';

const mailer = require('../../nodemailer');
const errorHandler = require("../../utils/errorHandler");

export default class CartsController {
  // get information about cart by customerId
  static async getInfoAboutCart(req, res) {
    try {
      let info = await CartDAO.getInfoAboutCart(req);
      res.status(200).json(info);
    } catch (e) {
      errorHandler(res, e)
    }
  }

  // добавить товар в корзину
  static async addItemToCart(req, res) {
    try {
      let info = await CartDAO.addItemToCart(req);
      res.status(200).json(info);
    } catch (e) {
      errorHandler(res, e)
    }
  }

  // очистить корзину пользователя
  static async clearCart(req, res) {
    let products = await CartDAO.getInfoAboutCart(req);
    let priceList = '';

    for (let item of products) {
      let product = item.dataValues.product.dataValues;
      let quantity = item.dataValues.quantity;
      priceList += '<li>Наименование: ' + product.name + ', цена: $'
        + product.price + ', количество: ' + quantity + ';</li>'
    }

    try {
      let info = await CartDAO.clearCart(req);
      res.status(200).json(info);
    } catch (e) {
      errorHandler(res, e)
    }

    let decoded = jwt_decode(req.params.token);
    let email = decoded.email;
    let firstName = decoded.firstName;

    const message = {
      to: ['stas.tuzov@internet.ru', email],
      subject: 'INTERIOR!',
      html: `<h2>${firstName}, поздравляем! Вы совершили покупку!</h2>
        <p>Наш оператор в скором времени свяжется с Вами.</p>
        <h3>Список покупок:</h3>
        <ul>
          ${priceList}
        </ul>
        <h3>Сумма покупки:</h3>
        <p>$ ${req.params.finalPrice}.</p>
        <p>Спасибо, что выбрали нас!</p>`
    }
    await mailer(message);
  }

  // удалить продукт
  static async deleteProduct(req, res) {
    try {
      let info = await CartDAO.deleteProduct(req);
      res.status(200).json(info);
    } catch (e) {
      errorHandler(res, e)
    }
  }

  //изменить количество продуктов
  static async changeQuantityProducts(req, res) {
    try {
      let info = await CartDAO.changeQuantityProducts(req);
      res.status(200).json(info);
    } catch (e) {
      errorHandler(res, e)
    }
  }

  // получить количество опреденного товара в корзине
  static async getQuantity(req, res) {
    try {
      let info = await CartDAO.getQuantity(req);
      res.status(200).json(info);
    } catch (e) {
      errorHandler(res, e)
    }
  }
}
