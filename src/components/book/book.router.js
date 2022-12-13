const bookRouter = require('express').Router();

const { authenticationMiddleware } = require('../../common/common.middleware');
const { addBookController, getBooksByIdController, deleteBookController } = require('./book.controller');
const { createBookMiddleware, deleteCheckMiddleware } = require('./book.middleware');

// ROUTES
bookRouter.post('/add', authenticationMiddleware, createBookMiddleware, addBookController);
bookRouter.get('/getBooksOfSeller/:id', getBooksByIdController);
bookRouter.delete('/delete/:id', authenticationMiddleware, deleteCheckMiddleware, deleteBookController);

module.exports = {
    bookRouter
};