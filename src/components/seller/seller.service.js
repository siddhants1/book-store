const { db } = require('../../common/common.models');

const createSellerService = async (data) => {
    const txn = await db.sequelize.transaction();
    try {
        const seller = await db.Seller.create(data, { transaction: txn });
        await txn.commit();
        return {
            success: true,
            seller: seller?.dataValues
        };
    } catch (err) {
        await txn.rollback();
        return {
            success: false,
            message: err?.errors?.[0]?.message
        };
    }
}

const findSellerByEmail = async (email) => {
    try {
        const seller = await db.Seller.findOne({ where: { email: email } });
        if (seller) {
            return {
                success: true,
                seller: seller?.dataValues,
            };
        }
        return {
            success: false,
            message: 'Incorrect Email',
        };
    }
    catch(err) {
        return {
            success: false,
            message: err?.errors?.[0]?.message,
        };
    }
}

const updateSellerService = async (data, id) => {
    const txn = await db.sequelize.transaction();
    try {
        const seller = await db.Seller.update(data, { where: { id: id } }, { transaction: txn });
        await txn.commit();
        return {
            success: true
        };
    } catch (err) {
        await txn.rollback();
        return {
            success: false,
            message: err?.errors?.[0]?.message ? err?.errors?.[0]?.message : 'Internal server error'
        };
    }
}

const deleteSellerService = async (id) => {
    const txn = await db.sequelize.transaction();
    try {
        await db.Seller.destroy({ where: { id: id } }, { transaction: txn });
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

module.exports = {
    createSellerService,
    findSellerByEmail,
    updateSellerService,
    deleteSellerService
};