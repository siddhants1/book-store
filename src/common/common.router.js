const { bookRouter } = require('../components/book/book.router');
const { customerRouter } = require('../components/customer/customer.router');
const { healthRouter } = require('../components/health/health.router');
const { orderRouter } = require('../components/order/order.router');
const { sellerRouter } = require('../components/seller/seller.router');

const routingMiddleware = (app) => {
    app.use('/health', healthRouter);

    app.use('/seller', sellerRouter);
    app.use('/book', bookRouter);
    app.use('/customer', customerRouter);
    app.use('/order', orderRouter);

    // 404 handler
    app.use((req, res, next) => {
        return res.status(404).json({ message: 'Not Found' });
    });
}

module.exports = {
    routingMiddleware,
};
