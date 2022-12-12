const { errorFunction } = require("../../common/common.utils");
const { signUpUtils, loginUtils, updateUtils, deleteUtils } = require("./seller.utils");

const signUpController = async (req, res) => {
    const body = {
        name: req.body?.name,
        email: req.body?.email,
        password: req.body?.password
    };

    const validationResult = await signUpUtils(body);
    if (validationResult.success === false) {
        return res.status(validationResult.statusCode).json(errorFunction(true, validationResult?.message));
    }
    return res.status(validationResult.statusCode).json(errorFunction(false, 'Success', validationResult?.seller));
}

const loginController = async (req, res) => {
    const body = {
        email: req.body?.email,
        password: req.body?.password
    };
    const loginValidation = await loginUtils(body);
    if (loginValidation.success === false) {
        return res.status(loginValidation.statusCode).json(errorFunction(true, loginValidation?.message));
    }
    return res.status(loginValidation.statusCode).json(errorFunction(false, 'Success', loginValidation?.seller));
}

const updateController = async (req, res) => {
    const updateValidations = await updateUtils(req.body, req.params?.id);
    if (updateValidations.success === false) {
        return res.status(updateValidations.statusCode).json(errorFunction(true, updateValidations?.message));
    }
    return res.status(updateValidations.statusCode).json(errorFunction(false, 'Updated Successfully'));
}

const deleteController = async (req, res) => {
    const deleteValidations = await deleteUtils(req.params?.id);
    if (deleteValidations.success === false) {
        return res.status(deleteValidations.statusCode).json(errorFunction(true, deleteValidations?.message));
    }
    return res.status(deleteValidations.statusCode).json(errorFunction(false, 'Deleted Successfully'));
}

module.exports = {
    signUpController,
    loginController,
    updateController,
    deleteController
};