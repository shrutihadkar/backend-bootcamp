// Import the helper functions we discussed earlier
// (Assuming they are in a file named booksModel.js in the same folder)
const { 
    getAllBooks, 
    getBooksById, 
    createBook, 
    updateBook 
} = require('../services/books.service');

// 1. GET all books
const handleGetAllBooks = (req, res) => {
    const allBooks = getAllBooks();
    return res.status(200).json(allBooks);
};

// 2. GET a single book by ID
const handleGetBookById = (req, res) => {
    // ID comes from the URL (e.g., /books/2), and it arrives as a string. 
    // We use parseInt() to turn it into a number so it matches our array IDs.
    const bookId = parseInt(req.params.id); 
    const book = getBooksById(bookId);

    if (!book) {
        return res.status(404).json({ message: `Book with ID ${bookId} not found` });
    }

    return res.status(200).json(book);
};

// 3. POST (Create) a new book
const handleCreateBook = (req, res) => {
    // Postman sends this data inside req.body
    const { title, price, category } = req.body;

    // Validation guard rail: A book MUST have a title
    if (!title) {
        return res.status(400).json({ message: "Title is required to create a book" });
    }

    const newBook = createBook(title, price, category);
    return res.status(201).json(newBook); // 201 status code means "Successfully Created"
};

// 4. PUT (Update) an existing book
const handleUpdateBook = (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, price, category } = req.body;

    const updatedBook = updateBook(bookId, title, price, category);

    if (!updatedBook) {
        return res.status(404).json({ message: `Cannot update. Book with ID ${bookId} not found` });
    }

    return res.status(200).json(updatedBook);
};

// Export these functions so your router file can use them
module.exports = {
    handleGetAllBooks,
    handleGetBookById,
    handleCreateBook,
    handleUpdateBook
  };