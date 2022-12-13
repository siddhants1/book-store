const { errorFunction } = require("../../common/common.utils");
const { getBookByIdService } = require("./book.service");
const { createBookValidation } = require("./book.utils");

const createBookMiddleware = async (req, res, next) => {
    const { error } = createBookValidation.validate(req.body);
    if (error) {
        return res.status(400).json(errorFunction(true, error?.message));
    }
    req.body.SellerId = req.user.id;
    next();
}

const deleteCheckMiddleware = async (req, res, next) => {
    if (!req.params?.id || req.params?.id === null || req.params?.id === undefined) {
        return res.status(400).json({ message: 'ID is required' });
    }
    const getByIdResult = await getBookByIdService(Number(req.params?.id));
    if (getByIdResult.success === false) {
        return res.status(400).json({ message: getByIdResult?.message });
    }
    if (Number(getByIdResult?.book?.SellerId) !== Number(req?.user?.id)) {
        return res.status(403).json({ message: 'Not authorized' });
    }
    next();
}

module.exports = {
    createBookMiddleware,
    deleteCheckMiddleware
};