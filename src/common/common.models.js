const { Sequelize } = require('sequelize');
const { invalidTokensModel } = require('../components/miscellaneous/miscellaneous.model');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER_NAME,
    process.env.PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
    },
);

const authenticateDbConnection = async (sequelize) => {
    try {
        await sequelize.authenticate();
        console.log('Sequelize: connection has been established successfully');
    }
    catch(err) {}
}

authenticateDbConnection(sequelize);

const db = {};
db.sequelize = sequelize;

const InvalidToken = invalidTokensModel(sequelize);

db.InvalidToken = InvalidToken;

sequelize.sync();

module.exports = {
    db,
};
