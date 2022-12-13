const { DataTypes } = require('sequelize');

const customerModel = (sequelize) => {
    const Customer = sequelize.define('Customer', {
        firstName: {
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
                }
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
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
                    const customer = await sequelize.models.Customer.findOne({ where: { email: value } });
                    if (customer !== null) {
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

    return Customer;
}

module.exports = {
    customerModel
};