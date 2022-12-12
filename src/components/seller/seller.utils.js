const joi = require('joi');
const { generatePasswordHash, generateJwt, isPasswordValid } = require('../../common/common.utils');
const { createSellerService, findSellerByEmail, updateSellerService, deleteSellerService } = require('./seller.service');

const sellerSignUpValidation = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
    password: joi.string().min(8).max(30).required(),
});

const sellerLoginValidation = joi.object({
    email: joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
    password: joi.string().required(),    
});

const sellerUpdateValidation = joi.object({
    name: joi.string().min(1),
    email: joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    password: joi.string().min(8).max(30),
});

const signUpUtils = async (body) => {
    const { error } = sellerSignUpValidation.validate(body);
    if (error) {
        return {
            success: false,
            statusCode: 400,
            message: error?.message
        };
    }

    body.password = await generatePasswordHash(body.password);
    const createResult = await createSellerService(body);
    
    if (createResult.success === false) {
        return {
            success: false,
            statusCode: 400,
            message: createResult?.message
        };
    }
    const tokenResult = await generateJwt(createResult?.seller);
    if (tokenResult.success === false) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error'
        };
    }
    const response = { token: tokenResult?.token, ...createResult?.seller };
    return {
        success: true,
        statusCode: 200,
        seller: response,
    };
}

const loginUtils = async (body) => {
    const { error } = sellerLoginValidation.validate(body);
    if (error) {
        return {
            success: false,
            statusCode: 400,
            message: error?.message
        };
    }

    const sellerResult = await findSellerByEmail(body?.email);
    if (sellerResult.success === false) {
        return {
            success: false,
            statusCode: 400,
            message: sellerResult?.message
        };
    }

    const passwordValid = await isPasswordValid(body?.password, sellerResult?.seller?.password);
    if (passwordValid === false) {
        return {
            success: false,
            statusCode: 401,
            message: 'Password is incorrect'
        };
    }

    const tokenResult = await generateJwt(sellerResult?.seller);
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
        seller: { token: tokenResult?.token, ...sellerResult?.seller }
    };
}

const updateUtils = async (body, id) => {
    if (id === null || id === undefined || (typeof id !== 'string') || id === '') {
        return {
            success: false,
            statusCode: 400,
            message: 'Id is required'
        };
    }
    
    const { error } = sellerUpdateValidation.validate(body);
    if (error) {
        return {
            success: false,
            statusCode: 400,
            message: error?.message
        };
    }

    const updateResult = await updateSellerService(body, Number(id));
    if (updateResult.success === false) {
        return {
            success: false,
            statusCode: 400,
            message: updateResult?.message
        };
    }
    return {
        success: true,
        statusCode: 200
    };
}

const deleteUtils = async (id) => {
    if (!id || id === null || id === undefined) {
        return {
            success: false,
            statusCode: 400,
            message: 'Id is required'
        };
    }
    const deleteResult = await deleteSellerService(Number(id));
    if (deleteResult.success === false) {
        return {
            success: false,
            statusCode: 400,
            message: deleteResult?.message
        };
    }
    return {
        success: true,
        statusCode: 200
    };
}

module.exports = {
    sellerSignUpValidation,
    sellerLoginValidation,
    sellerUpdateValidation,
    signUpUtils,
    loginUtils,
    updateUtils,
    deleteUtils
};