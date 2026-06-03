const express = require('express');
const app = express();
app.use = express();
const PORT = 3000;
const products = [
    { id: 1, name: 'Laptop', price: 75000, category: 'electronics', inStock: true },
    { id: 2, name: 'Headphones', price: 3500, category: 'electronics', inStock: false },
    { id: 3, name: 'Notebook', price: 150, category: 'stationery', inStock: true },
    { id: 4, name: 'Pen Set', price: 200, category: 'stationery', inStock: true },
    { id: 5, name: 'Monitor', price: 25000, category: 'electronics', inStock: true },
  ];
  
  app.get('/products', (req, res) => {
    let result = [...products];
  
    if (req.query.category) {
      result = result.filter(p => p.category === req.query.category);
    }
  
    if (req.query.inStock) {
      const inStock = req.query.inStock === 'true';
      result = result.filter(p => p.inStock === inStock);
    }
  
    if (req.query.search) {
      const term = req.query.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(term));
    }
  
    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  });
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });