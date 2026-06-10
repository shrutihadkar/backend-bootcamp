const express = require('express');
const router = express.Router();

// 1. Import your controller functions
const {
    handleGetAllBooks,
    handleGetBookById,
    handleCreateBook,
    handleUpdateBook
} = require('../controller/books.controller');

// 2. Import your middleware functions
const { validateBookData } = require('../middleware/errorHandler');

// 3. Define the Routes

// Route: GET /books -> Fetch the entire list of books
router.get('/', handleGetAllBooks);

// Route: GET /books/:id -> Fetch a single book using its ID number
router.get('/:id', handleGetBookById);

// Route: POST /books -> Create a new book
// 🛑 Notice: validateBookData acts as a gatekeeper BEFORE handleCreateBook runs!
router.post('/', validateBookData, handleCreateBook);

// Route: PUT /books/:id -> Update an existing book's details by its ID
// 🛑 Notice: validateBookData checks the incoming body here too!
router.put('/:id', validateBookData, handleUpdateBook);

// 4. Export the router so server.js can see it
module.exports = router;