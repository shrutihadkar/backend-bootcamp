require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME;

  const books = [
    { id: 1, title: 'Harry Potter', author: 'J.K. Rowling', genre: 'fantasy', price: 500, inStock: true },
    { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'fiction', price: 300, inStock: true },
    { id: 3, title: 'Atomic Habits', author: 'James Clear', genre: 'self-help', price: 400, inStock: false },
    { id: 4, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'self-help', price: 350, inStock: true },
    { id: 5, title: 'The Hobbit', author: 'J.R.R Tolkien', genre: 'fantasy', price: 450, inStock: true },
  ];
  let nextId = 6;
  
  app.get('/books', (req, res) => {
    let result = [...books];
  
    if (req.query.genre) {
      result = result.filter(b => b.genre === req.query.genre);
    }
  
    if (req.query.inStock) {
      const inStock = req.query.inStock === 'true';
      result = result.filter(b => b.inStock === inStock);
    }
    if (req.query.search) {
      const term = req.query.search.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(term));
    }
    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  });
  app.get('/books/:id', (req, res) => {
    // 1. Extract the ID from the URL and convert it from a string to a number
    const bookId = parseInt(req.params.id, 10);
  
    // 2. Search the 'books' array for a single item that matches the ID
    const book = books.find(b => b.id === bookId);
  
    // 3. If the book doesn't exist in the array, trigger the 404 Not Found
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book with ID ${bookId} not found.`
      });
    }
  
    // 4. If the book is found, return it successfully
    res.status(200).json({
      success: true,
      data: book
    });
  });
  app.post('/books', (req, res) => {
    console.log('Body:', req.body); // add this line
    console.log('Headers:', req.headers); // add this line
    const { title, author, genre, price } = req.body;
  
    if (!title || !author || !genre || !price) {
      return res.status(400).json({
        success: false,
        message: 'title, author, genre and price are required'
      });
    }
  
    const newBook = {
      id: nextId++,
      title,
      author,
      genre,
      price,
      inStock: true
    };
  
    books.push(newBook);
  
    res.status(201).json({
      success: true,
      data: newBook
    });
  });
  
app.listen(PORT, () => {
    console.log(`${APP_NAME} running on http://localhost:${PORT}`);
  });

