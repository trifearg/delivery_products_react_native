const Sequelize = require('sequelize');

export class CartProduct extends Sequelize.Model {
}

module.exports = function (sequelize) {
  CartProduct.init({
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'cart_product',
    timestamps: false,
    freezeTableName: true
  });
  return CartProduct;
}
