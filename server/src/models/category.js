const Sequelize = require('sequelize');

export class Category extends Sequelize.Model {
}

module.exports = function (sequelize) {
  Category.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'category',
      timestamps: false,
      freezeTableName: true
    });
  return Category;
}