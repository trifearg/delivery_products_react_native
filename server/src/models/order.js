const Sequelize = require('sequelize');

export class Order extends Sequelize.Model {
}

module.exports = function (sequelize) {
    Order.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            id_customer: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: 'order',
            timestamps: false,
            freezeTableName: true
        });
    return Order;
}