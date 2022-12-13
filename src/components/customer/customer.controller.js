const { errorFunction } = require('../../common/common.utils');
const { customerSignUpUtils, customerLoginUtils } = require('./customer.utils');

const createCustomerController = async (req, res) => {
    const body = {
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        email: req.body?.email,
        password: req.body?.password
    };
    const createValidations = await customerSignUpUtils(body);

    if (createValidations.success === false) {
        return res.status(createValidations.statusCode).json(errorFunction(true, createValidations?.message));
    }
    return res.status(createValidations.statusCode).json(errorFunction(false, 'Success', createValidations?.customer));
}

const customerLoginController = async (req, res) => {
    const body = {
        email: req.body?.email,
        password: req.body?.password
    };
    const loginValidations = await customerLoginUtils(body);

    if (loginValidations.success === false) {
        return res.status(loginValidations.statusCode).json(errorFunction(true, loginValidations?.customer));
    }
    return res.status(loginValidations.statusCode).json(errorFunction(false, 'Success', loginValidations?.customer));
}

module.exports = {
    createCustomerController,
    customerLoginController
};