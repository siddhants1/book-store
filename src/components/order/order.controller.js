const joi = require('joi');
const { errorFunction } = require('../../common/common.utils');
const { placeOrderService, getAllOrders } = require('./order.service');

const orderPlaceValidation = joi.object({
    CustomerId: joi.number().min(1).required(),
    BookId: joi.number().min(1).required()
});

const addOrderController = async (req, res) => {
    const { error } = orderPlaceValidation.validate(req.body);
    if (error) {
        return res.status(400).json(errorFunction(true, error?.message));
    }
    const addResult = await placeOrderService(req.body);
    if (addResult.success === false) {
        return res.status(400).json(errorFunction(true, addResult?.message));
    }
    return res.status(200).json(errorFunction(false, 'Success'));
}

module.exports = {
    addOrderController
};