require('dotenv').config();

const express = require('express');
const app = express();
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
  
  app.get('/books', (req, res) => {
    let result = [...books];
  
    if (req.query.genre) {
      result = result.filter(b => b.genre === req.query.genre);
    }
  
    if (req.query.inStock) {
      const inStock = req.query.inStock === 'true';
      result = result.filter(b => b.inStock === inStock);
    }
  
    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  });
  if (req.query.search) {
    const term = req.query.search.toLowerCase();
    result = result.filter(b => b.title.toLowerCase().includes(term));
  }
app.listen(PORT, () => {
    console.log(`${APP_NAME} running on http://localhost:${PORT}`);
  });