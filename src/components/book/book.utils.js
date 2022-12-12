const joi = require('joi');
const { createBookService } = require('./book.service');

const createBookValidation = joi.object({
    title: joi.string().min(1).required(),
    price: joi.number().min(1).required()
});

const addBookUtils = async (data) => {
    const addResult = await createBookService(data);
    if (addResult.success === false) {
        return {
            success: false,
            statusCode: 400,
            message: addResult?.message
        };
    }
    return {
        success: true,
        statusCode: 200,
        book: addResult?.book
    };
}

module.exports = {
    createBookValidation,
    addBookUtils
};