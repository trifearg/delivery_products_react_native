import {CartDAO} from "../dao/cartDAO";

const Sequelize = require('sequelize');

export class Customer extends Sequelize.Model {
}
/*Если удаляется пользователь, то автоматически удаляется корзина из БД
* Если создается новый пользователь, то автоматически создается для него новая корзина*/

module.exports = function (sequelize) {
  Customer.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'customer',
    timestamps: false,
    freezeTableName: true,
    hooks: {
      afterSave: async function(customer, options) {
        await CartDAO.createCart({
          id_customer: customer.id
        })
      },
      beforeBulkDestroy: async function(customer, options) {
        await CartDAO.deleteCart(customer.where.id)
      }
    }
  });
  return Customer;
}