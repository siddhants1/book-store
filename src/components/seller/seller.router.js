const { signUpController, loginController, updateController, deleteController } = require('./seller.controller');
const { authenticationMiddleware } = require('../../common/common.middleware');
const { idCheckMiddleware } = require('./seller.middleware');

const sellerRouter = require('express').Router();

// Routes
sellerRouter.post('/sign-up', signUpController);
sellerRouter.post('/login', loginController);
sellerRouter.patch('/update/:id', authenticationMiddleware, idCheckMiddleware, updateController);
sellerRouter.delete('/delete/:id', authenticationMiddleware, idCheckMiddleware, deleteController);


module.exports = {
    sellerRouter,
};