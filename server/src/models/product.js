const Sequelize = require('sequelize');

export class Product extends Sequelize.Model {
}

module.exports = function (sequelize) {
  Product.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    energyValue: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    weight: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'product',
    timestamps: false,
    freezeTableName: true
  });
  return Product;
}
