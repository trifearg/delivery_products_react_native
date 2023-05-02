import {CustomerDAO} from "../../dao/customerDAO";

const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const errorHandler = require("../../utils/errorHandler");
const mailer = require('../../nodemailer');

export default class CustomersController {
  // register customer
  static async createCustomer(req, res) {
    const candidate = await CustomerDAO.getCustomerByEmail(req);

    if (candidate) {
      // Пользователь существует. Нужно отправить ошибку!
      res.status(403).json({
        message: "Такой email уже занят. Попробуйте другой!"
      });
    } else {
      // Нужно создать пользователя
      try {
        const user = await CustomerDAO.createCustomer(req);
        res.status(201).json(user)

        const message = {
          to: user.dataValues.email,
          subject: 'Регистрация в интернет-магазине INTERIOR',
          html: `<h2>Здравствуйте, ${user.dataValues.firstName}!</h2>
                 <p>Поздравляем, Вы успешно зарегистрировались.</p>
                 <p>Спасибо, что выбрали наш интернет-магазин Interior!</p>`
        }
        await mailer(message);
      } catch (e) {
        errorHandler(res, e);
      }
    }
  }

  // login customer
  static async loginCustomer(req, res) {
    const candidate = await CustomerDAO.getCustomerByEmail(req);

    if (candidate) {
      // Проверка пароля. Пользователь существует!
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

      if (passwordResult) {
        // Пароли совпали. Генерация токена!
        const token = JWT.sign({
          email: candidate.email,
          userId: candidate.id,
          name: candidate.name
        }, 'dev-jwt', {expiresIn: 60 * 60});

        res.status(200).json({
          token: `Bearer ${token}`
        })
      } else {
        // Пароли не совпали!
        res.status(401).json({
          message: "Неправильный пароль. Попробуйте снова!"
        });
      }
    } else {
      // Email не найден!
      res.status(404).json({
        message: "Пользователь с таким email не найден!"
      })
    }
  }

  // get all customers
  static async getCustomers(res) {
    try {
      let customers = await CustomerDAO.getCustomers();
      res.status(200).json(customers);
    } catch (e) {
      errorHandler(res, e)
    }
  }

  // get customer by ID
  static async getCustomerById(req, res) {
    try {
      let customer = await CustomerDAO.getCustomerById(req);
      res.status(200).json(customer);
    } catch (e) {
      errorHandler(res, e)
    }
  }

  // update customer
  static async updateCustomer(req, res) {
    try {
      let response = await CustomerDAO.updateCustomer(req);
      res.status(200).json(response);
    } catch (e) {
      errorHandler(res, e)
    }
  }

  // delete customer by ID
  static async deleteCustomerById(req, res) {
    try {
      let response = await CustomerDAO.deleteCustomerById(req);
      res.status(200).json(response);
    } catch (e) {
      errorHandler(res, e)
    }
  }
}
