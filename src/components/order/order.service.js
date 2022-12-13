const { db } = require('../../common/common.models');

const placeOrderService = async (data) => {
    const txn = await db.sequelize.transaction();
    try {
        const order = await db.Order.create(data, { transaction: txn });
        await txn.commit();
        return {
            success: true,
        };
    } catch (err) {
        await txn.rollback();
        return {
            success: false,
            message: err?.errors?.[0]?.message ? err?.errors?.[0]?.message : 'Internal server error'
        };
    }
}

const getAllOrders = async () => {
    try {
        const orders = await db.Customer.findAll({
            include: [{ model: db.Book, required: true }]
        });
        return {
            success: true,
            orders: orders,
        };
    } catch (err) {
        console.log('Err is \n\n', err, '\n \n err was');
        return {
            success: false,
            message: err?.errors?.[0]?.message ? err?.errors?.[0]?.message : 'Internal server error'
        };
    }
}

module.exports = {
    placeOrderService,
    getAllOrders
};