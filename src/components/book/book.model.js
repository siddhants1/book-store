const { DataTypes } = require('sequelize');

const bookModel = (sequelize) => {
    const Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Title is required',
                },
                isNotNull(value) {
                    if (typeof value !== 'string') {
                        throw new Error('Title should be of type string');
                    }
                    if (value === null || value === undefined || value?.trim() === '') {
                        throw new Error('Title cannot be empty');
                    }
                },
            },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: 'Price is required'
            },
            isValid(value) {
                if (typeof value !== 'number') {
                    throw new Error('Price must be of type number');
                }
                if (value === null || value === undefined) {
                    throw new Error('Price cannot be null');
                }
            }
        }
    });
    return Book;
}

module.exports = {
    bookModel
};