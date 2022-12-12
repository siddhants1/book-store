const { Sequelize } = require('sequelize');
const { bookModel } = require('../components/book/book.model');
const { invalidTokensModel } = require('../components/miscellaneous/miscellaneous.model');
const { sellerModel } = require('../components/seller/seller.model');
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
const Seller = sellerModel(sequelize);
const Book = bookModel(sequelize);

db.InvalidToken = InvalidToken;
db.Seller = Seller;
db.Book = Book;

// ASSOCIATIONS
db.Seller.hasMany(db.Book);
db.Book.belongsTo(db.Seller);

sequelize.sync();

module.exports = {
    db,
};
