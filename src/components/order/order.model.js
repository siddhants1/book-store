const { DataTypes } = require('sequelize');

const orderModel = (sequelize) => {
    const Order = sequelize.define('Order', {});
    return Order;
}

module.exports = {
    orderModel
};