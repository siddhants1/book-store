const { errorFunction } = require("../../common/common.utils");
const { createBookValidation } = require("./book.utils");

const createBookMiddleware = async (req, res, next) => {
    const { error } = createBookValidation.validate(req.body);
    if (error) {
        return res.status(400).json(errorFunction(true, error?.message));
    }
    req.body.SellerId = req.user.id;
    next();
}

module.exports = {
    createBookMiddleware
};