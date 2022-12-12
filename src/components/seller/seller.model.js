const { DataTypes } = require('sequelize');

const sellerModel = (sequelize) => {
    const Seller = sequelize.define('Seller', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Name is required',
                },
                isNotNull(value) {
                    if (typeof value !== 'string') {
                        throw new Error('Name should be of type string');
                    }
                    if (value === null || value === undefined || value?.trim() === '') {
                        throw new Error('Name cannot be empty');
                    }
                },
                async isUnique(value) {
                    const seller = await sequelize.models.Seller.findOne({ where: { name: value } });
                    if (seller !== null) {
                        throw new Error('Seller name already exists');
                    }
                }
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Email cannot be null',
                },
                isEmail: {
                    msg: 'A valid email is required',
                },
                async isUnique(value) {
                    const seller = await sequelize.models.Seller.findOne({ where: { email: value } });
                    if (seller !== null) {
                        throw new Error('Email already exists');
                    }
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password cannot be null',
                },
                isValid(value) {
                    if (typeof value !== 'string') {
                        throw new Error('Password must be a string');
                    }
                    if (value === null || value === undefined || value?.trim() === '') {
                        throw new Error('Password cannot be empty or null');
                    }
                },
            },
        }
    });

    return Seller;
}

module.exports = {
    sellerModel,
};
