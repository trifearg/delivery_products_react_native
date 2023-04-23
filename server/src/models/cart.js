const Sequelize = require('sequelize');

export class Cart extends Sequelize.Model {
}

module.exports = function (sequelize) {
  Cart.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_customer: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'cart',
      timestamps: false,
      freezeTableName: true
    });
  return Cart;
}