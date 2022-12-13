const { errorFunction } = require('../../common/common.utils');
const { getBooksBySellerService, deleteBookService } = require('./book.service');
const { addBookUtils } = require('./book.utils');

const addBookController = async (req, res) => {
    const addResult = await addBookUtils(req.body);
    if (addResult.success === false) {
        return res.status(addResult.statusCode).json(errorFunction(true, addResult?.message));
    }
    return res.status(addResult.statusCode).json(errorFunction(false, 'Success', addResult?.book));
}

const getBooksByIdController = async (req, res) => {
    if (!req.params?.id || req.params?.id === null || req.params?.id === undefined || (/^[0-9]*$/.test(req.params?.id) === false)) {
        return res.status(400).json(errorFunction(true, 'Id is required'));
    }
    const getResult = await getBooksBySellerService(Number(req.params?.id));
    if (getResult.success === false) {
        return res.status(400).json(errorFunction(true, getResult?.message));
    }
    return res.status(200).json(errorFunction(false, 'Success', getResult?.books));
}

const deleteBookController = async (req, res) => {
    const deleteResult = await deleteBookService(Number(req.params?.id));
    if (deleteResult.success === false) {
        return res.status(400).json(errorFunction(true, deleteResult?.message));
    }
    return res.status(200).json(errorFunction(false, 'Deleted successfully'));
}

module.exports = {
    addBookController,
    getBooksByIdController,
    deleteBookController
};