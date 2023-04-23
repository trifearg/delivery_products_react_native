const Sequelize = require('sequelize');

export class Photo extends Sequelize.Model {
}

module.exports = function (sequelize) {
  Photo.init({
    photo_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'photo',
    timestamps: false,
    freezeTableName: true
  });
  return Photo;
}
