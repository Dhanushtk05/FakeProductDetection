const books = require('../data/books.json');
const Book = require('../models/bookModel');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database')

dotenv.config({path:'backend/config/config.env'});
connectDatabase();

const seedProducts = async ()=>{
    try{
        await Book.deleteMany();
        console.log('Books deleted!')
        await Book.insertMany(books);
        console.log('All books added!');
    }catch(error){
        console.log(error.message);
    }
    process.exit();
}

seedProducts();