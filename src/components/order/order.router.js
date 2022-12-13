const orderRouter = require('express').Router();
const { authenticationMiddleware } = require('../../common/common.middleware');
const { addOrderController } = require('./order.controller');
const { getAllOrders } = require('./order.service');

orderRouter.post('/place', authenticationMiddleware, addOrderController);
orderRouter.get('/get', async (req, res) => {
    const orders = await getAllOrders();
    return res.status(200).json({ orders: orders?.orders });
});

module.exports = {
    orderRouter,
};