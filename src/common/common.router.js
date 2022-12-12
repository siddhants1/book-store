const { healthRouter } = require('../components/health/health.router');
const { sellerRouter } = require('../components/seller/seller.router');

const routingMiddleware = (app) => {
    app.use('/health', healthRouter);

    app.use('/seller', sellerRouter);

    // 404 handler
    app.use((req, res, next) => {
        return res.status(404).json({ message: 'Not Found' });
    });
}

module.exports = {
    routingMiddleware,
};
