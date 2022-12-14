const { db } = require('../../common/common.models');

const createBookService = async (data) => {
    const txn = await db.sequelize.transaction();
    try {
        const book = await db.Book.create(data, { transaction: txn });
        await txn.commit();
        return {
            success: true,
            book: book?.dataValues
        };
    } catch (err) {
        return {
            success: false,
            message: err?.errors?.[0]?.message ? err?.errors?.[0]?.message : 'Internal Server Error'
        };
    }
}

const getBooksBySellerService = async (id) => {
    try {
        const books = await db.Book.findAll({
            where: { SellerId: id },
            include: [{
                model: db.Seller,
                required: true
            }]
        });
        return {
            success: true,
            books: books,
        };
    } catch (err) {
        return {
            success: false,
            message: err?.errors?.[0]?.message ? err?.errors?.[0]?.message : 'Internal Server Error'
        };
    }
}

const deleteBookService = async (id) => {
    const txn = await db.sequelize.transaction();
    try {
        await db.Book.destroy({ where: { id: id } }, { transaction: txn });
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

const getBookByIdService = async (id) => {
    try {
        const book = db.Book.findOne({ where: { id: id } });
        if (book) {
            return {
                success: true,
                book: book?.dataValues
            }
        }
        return {
            success: false,
            message: 'Incorrect Id'
        };
    } catch (err) {
        return {
            success: false,
            message: err?.errors?.[0]?.message ? err?.errors?.[0]?.message : 'Internal server error'
        };
    }
}

module.exports = {
    createBookService,
    getBooksBySellerService,
    deleteBookService,
    getBookByIdService
};