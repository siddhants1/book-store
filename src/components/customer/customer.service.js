const { db } = require('../../common/common.models');

const createCustomerService = async (data) => {
    const txn = await db.sequelize.transaction();
    try {
        const customer = await db.Customer.create(data, { transaction: txn });
        await txn.commit();
        return {
            success: true,
            customer: customer?.dataValues
        };
    } catch (err) {
        await txn.rollback();
        return {
            success: false,
            message: err?.errors?.[0]?.message
        };
    }
}

const findCustomerByEmailService = async (email) => {
    try {
        const customer = await db.Customer.findOne({ where: { email: email } });
        if (customer) {
            return {
                success: true,
                customer: customer?.dataValues
            };
        }
        return {
            success: false,
            message: 'Invalid email'
        };   
    } catch (err) {
        return {
            success: false,
            message: err?.errors?.[0]?.message
        };
    }
}

module.exports = {
    createCustomerService,
    findCustomerByEmailService
};