const Sequelize = require('sequelize');

export class ProductCategory extends Sequelize.Model {
}

module.exports = function (sequelize) {
  ProductCategory.init({
    id_category: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    id_product: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'product_category',
    timestamps: false,
    freezeTableName: true
  });
  return ProductCategory;
}