const bookRouter = require('express').Router();

const { authenticationMiddleware } = require('../../common/common.middleware');
const { addBookController, getBooksByIdController } = require('./book.controller');
const { createBookMiddleware } = require('./book.middleware');

// ROUTES
bookRouter.post('/add', authenticationMiddleware, createBookMiddleware, addBookController);
bookRouter.get('/getBooksOfSeller/:id', getBooksByIdController);

module.exports = {
    bookRouter
};