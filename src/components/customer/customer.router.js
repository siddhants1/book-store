const { createCustomerController, customerLoginController } = require('./customer.controller');

const customerRouter = require('express').Router();

customerRouter.post('/sign-up', createCustomerController);
customerRouter.post('/login', customerLoginController);

module.exports = {
    customerRouter
};