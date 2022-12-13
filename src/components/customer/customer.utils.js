const joi = require('joi');
const { generatePasswordHash, generateJwt, isPasswordValid } = require('../../common/common.utils');
const { createCustomerService, findCustomerByEmailService } = require('./customer.service');

const customerSignUpValidation = joi.object({
    firstName: joi.string().min(1).required(),
    lastName: joi.string().min(1),
    email: joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
    password: joi.string().min(8).max(30).required(),
});

const customerLoginValidation = joi.object({
    email: joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
    password: joi.string().min(8).max(30).required(),
});

const customerSignUpUtils = async (body) => {
    const { error } = customerSignUpValidation.validate(body);
    if (error) {
        return {
            success: false,
            statusCode: 400,
            message: error?.message
        };
    }

    body.password = await generatePasswordHash(body.password);
    const createResult = await createCustomerService(body);

    if (createResult.success === false) {
        return {
            success: false,
            statusCode: 400,
            message: createResult?.message
        };
    }
    const tokenResult = await generateJwt(createResult?.customer);
    if (tokenResult.success === false) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error'
        };
    }

    return {
        success: true,
        statusCode: 200,
        customer: { token: tokenResult?.token, ...createResult?.customer }
    };
}

const customerLoginUtils = async (body) => {
    const { error } = customerLoginValidation.validate(body);
    if (error) {
        return {
            success: false,
            statusCode: 400,
            message: error?.message
        };
    }

    const customerResult = await findCustomerByEmailService(body?.email);
    
    if (customerResult.success === false) {
        return {
            success: false,
            statusCode: 400,
            message: customerResult?.message
        };
    }

    const passwordValid = await isPasswordValid(body?.password, customerResult?.customer?.password);
    if (passwordValid === false) {
        return {
            success: false,
            statusCode: 401,
            message: 'Password is incorrect'
        };
    }

    const tokenResult = await generateJwt(customerResult?.customer);
    if (tokenResult.success === false) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error'
        };
    }

    return {
        success: true,
        statusCode: 200,
        customer: { token: tokenResult?.token, ...customerResult?.customer }
    };
}

module.exports = {
    customerSignUpValidation,
    customerSignUpUtils,
    customerLoginUtils
};